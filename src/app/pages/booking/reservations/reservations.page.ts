import { Component, OnInit } from '@angular/core';
import {formatDate} from '@angular/common';
import {Booking} from "../../../model/Booking";
import {MyinputService} from "../../../service/input/myinput.service";
import{getFirestore, collection, query, where} from 'firebase/firestore'
import {Router} from "@angular/router";
import {Court} from "../../../model/Court";
import {BookingService} from "../../../service/manageObject/booking/booking.service";
import {Club} from "../../../model/Club";
import {DateService} from "../../../service/manageObject/date/date.service";
import {PersistentMenagerService} from "../../../service/persistent/persistentMenager/persistent-menager.service";
import {Subscription} from "rxjs";


@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.page.html',
  styleUrls: ['./reservations.page.scss'],
})
export class ReservationsPage implements OnInit {

  date: Date
  labelDate: string
  showCal =false
  public club: Club;
  public selected: boolean;
  public timeClicked: number;
  public courtSelected: number;
  public booking: Booking;
  private bookingSubscribe : Subscription
  public bookingsDay: Booking[];
  private idClub : string;
  private fromTabs : boolean

  constructor(private myInput: MyinputService, private bookingservice: BookingService, private dateService: DateService, private persistentService: PersistentMenagerService , private route: Router) {
    this.selected = false
  }

  ngOnInit() {
    this.date=new Date()
    this.labelDate= this.dateService.getStringDate(this.date) ;
    // @ts-ignore
    this.idClub=this.myInput.getInput().club
    // @ts-ignore
    this.fromTabs=this.myInput.getInput().fromTabs
    this.persistentService.loadOne(Club.name, this.idClub).subscribe(
      (obj)=>{
        this.club= this.persistentService.eval(Club.name,obj,true)
      }
    )
    this.bookingSubscribe=this.persistentService.searchBooking(null,null,this.idClub,null,this.dateService.getStartDay(this.date),this.dateService.getEndDay(this.date)).subscribe(
      (obj)=>{
        console.log(this.dateService.getStartDay(this.date))
        console.log(this.dateService.getEndDay(this.date))
        if(obj.length>0)this.bookingsDay=this.persistentService.eval(Booking.name,obj)
        else this.bookingsDay=[]
      }
    )
    this.booking = new Booking()
  }

  showCalendar(){
    this.showCal = !this.showCal;
  }

  dateChange(dateinput : string ){
    this.date= new Date(dateinput);
    this.labelDate= this.dateService.getStringDate(this.date);
    this.showCalendar()
    this.bookingSubscribe.unsubscribe()
    this.bookingSubscribe=this.persistentService.searchBooking(null,null,this.idClub,null,this.dateService.getStartDay(this.date),this.dateService.getEndDay(this.date)).subscribe(
      (obj)=>{
        if(obj.length>0)this.bookingsDay=this.persistentService.eval(Booking.name,obj)
        else this.bookingsDay=[]
      }
    )
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
    return this.bookingservice.bookingCheck(this.bookingsDay, court.number, time)
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
      this.booking.startHour = null
      this.booking.numberHour = null
      this.timeClicked = null
      this.courtSelected = null
    }
    else if(this.courtSelected == court){
      this.booking.numberHour  = 1 + time-this.booking.startHour
    }
  }

  setDisableHour(time: number, court: number){
    let date=new Date()
    if(time <=date.getHours())return true
    if(!this.timeClicked && !this.courtSelected) return false
    if(this.courtSelected && court!=this.courtSelected) return true
    else if (time < this.timeClicked || time>this.timeClicked+1) return true
    else return false
  }

  goToPayment(){
    if(this.booking && this.booking.startHour && this.booking.numberHour){
      this.booking.date=this.date
      let court : Court
      for (const item of this.club.courts) {
        if(item.number==this.courtSelected)court=item
      }
      this.myInput.addInput({
        club : this.idClub,
        fromTabs : this.fromTabs,
        booking : this.booking,
        court : court
      })
      this.route.navigate(['payments'])
    }
  }

}
