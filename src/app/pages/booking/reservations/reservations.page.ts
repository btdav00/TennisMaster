import { Component, OnInit } from '@angular/core';
import {formatDate} from '@angular/common';
import {Booking} from "../../../model/Booking";
import {MyinputService} from "../../../service/input/myinput.service";
import{getFirestore, collection, query, where} from 'firebase/firestore'
import {Router} from "@angular/router";
import {Court} from "../../../model/Court";
import {BookingService} from "../../../service/manageObject/booking/booking.service";
import {Club} from "../../../model/Club";


@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.page.html',
  styleUrls: ['./reservations.page.scss'],
})
export class ReservationsPage implements OnInit {

  date: Date
  labelDate: string
  showCal =false
  private club: Club;
  private selected: boolean;
  private timeClicked: number;
  private courtSelected: number;
  private booking: Booking;

  constructor(private myInput: MyinputService, private bookingservice: BookingService) {
    this.labelDate = formatDate(new Date(), 'yyy/MM/dd', 'en');
    this.selected = false
  }

  ngOnInit() {
    this.date=new Date()
    let  day= <unknown>this.date.getUTCDate()
    let month= <unknown>(this.date.getMonth()+1)
    let year= <unknown>this.date.getFullYear()
    this.labelDate= day+"/"+month+"/"+year;
    let court = new Court()
    court.number = 1
    this.club = new Club()
    this.club.courts = [court]
    this.club.times = [9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]
    this.booking = new Booking()
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

  bookingCheck(court: Court, time: number){
    return this.bookingservice.bookingCheck(this.club, court, time)
  }

  setSelected(time: number, court: number){
    if(!this.selected){
      this.selected = true
      this.timeClicked = time
      this.courtSelected = court
      this.booking.startHour = time
      this.booking.numberHour = 1
    }
    else if(this.timeClicked == time && this.courtSelected == court){
      this.selected = false
    }
    else if(this.courtSelected == court){
      this.booking.numberHour  = 1 + time-this.booking.startHour
    }
  }

  setDisableHour(time: number, court: number){
    if(court!=this.courtSelected) return true
    else if (time < this.timeClicked || time>this.timeClicked+1) return true
  }

}
