import { Component, OnInit } from '@angular/core';
import {formatDate} from "@angular/common";

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.page.html',
  styleUrls: ['./reservations.page.scss'],
})
export class ReservationsPage implements OnInit {

  date: Date
  labelDate: string
  showCal =false;

  constructor() {
    //this.labelDate = this.date.getDay().toString()+"/"+this.date.getMonth().toString()+"/"+this.date.getFullYear().toString();
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
    this.labelDate= day+"/"+month+"/"+this.date.getFullYear();
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


  ngOnInit() {
  }

}
