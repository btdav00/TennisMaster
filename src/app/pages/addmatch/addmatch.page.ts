import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-addmatch',
  templateUrl: './addmatch.page.html',
  styleUrls: ['./addmatch.page.scss'],
})
export class AddmatchPage implements OnInit {

  result: FormGroup;
  labelDate="Data del match"
  date : Date;
  showCal = false;

  constructor() {
    this.result = new FormGroup({
      wName: new FormControl(''),
      lName: new FormControl(''),
      wGameSet1: new FormControl(''),
      wGameSet2: new FormControl(''),
      wGameSet3: new FormControl(''),
      lGameSet1: new FormControl(''),
      lGameSet2: new FormControl(''),
      lGameSet3: new FormControl(''),
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


  ngOnInit() {
  }

}
