import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  Validators,
  FormBuilder,
  FormControl,
  AbstractControl,
} from '@angular/forms';
import {
  AlertController,
  LoadingController,
  NavController,
} from '@ionic/angular';
import { Router } from '@angular/router';
import { CalendarPage } from '../calendar/calendar.page';
import { format , parseISO } from 'date-format';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
})
export class RegistrationPage implements OnInit {
  credential: FormGroup;
  personalData: FormGroup;
  labelDate="Data di nascita"
  date : Date;
  showCal =false;


  constructor() {
    this.credential = new FormGroup({
      email: new FormControl(''),
      password: new FormControl(''),
      confirmPassword: new FormControl(''),
    });
    this.personalData = new FormGroup({
      name: new FormControl(''),
      surname: new FormControl(''),
      date: new FormControl(''),
    });
  }

  showCalendar(){
    this.showCal = !this.showCal;
  }

  dateChange(dateinput : string ){

    this.date= new Date(dateinput);
    let  day= <unknown>this.date.getUTCDate()
    let month= <unknown>(this.date.getMonth()+1)
    let year= <unknown>this.date.getFullYear()
    if(day<10){
       day= "0"+day
    }
    if(month<10){
       month= "0"+month
    }
    this.labelDate='data di nascita : '+day+"/"+month+"/"+this.date.getFullYear();
    this.showCalendar()
  }

  getDateValue(){
    if (this.date){
      return this.date.toISOString()
    }
    else new Date().toISOString()
  }

  getToday(){
    return new Date().toISOString()
  }

  submit(){

  }
  ngOnInit() {}
}
