import { Component, OnInit } from '@angular/core';
import {formatDate} from '@angular/common';
import {Booking} from "../../../model/Booking";
import {MyinputService} from "../../../service/input/myinput.service";
import{getFirestore, collection, query, where} from 'firebase/firestore'
import {Router} from "@angular/router";


@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.page.html',
  styleUrls: ['./reservations.page.scss'],
})
export class ReservationsPage implements OnInit {

  date: Date
  labelDate: string
  showCal =false
  private timeClicked: number
  private color: String
  private selected: Booking;

  constructor(private myInput: MyinputService) {
    this.labelDate = formatDate(new Date(), 'yyy/MM/dd', 'en');
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
    this.labelDate= day+"/"+month+"/"+year;
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
    let  day= <unknown>this.date.getUTCDate()
    let month= <unknown>(this.date.getMonth()+1)
    let year= <unknown>this.date.getFullYear()
    this.labelDate= day+"/"+month+"/"+year;
    // @ts-ignore
    this.reservation.club=this.myInput.getInput().reservation.club
    const db = getFirestore();
    const col = collection(db, 'court')
    //this.courts = query(col, where('club','==',this.reservation.club));
    //this.bookingCheck();
  }

}
