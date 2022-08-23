import {Component, Input, OnInit} from '@angular/core';
import {Booking} from "../../../model/Booking";

@Component({
  selector: 'app-mybooking',
  templateUrl: './mybooking.page.html',
  styleUrls: ['./mybooking.page.scss'],
})
export class MybookingPage implements OnInit {

  @Input() booking : Booking

  constructor() { }

  ngOnInit() {
  }

  stringDate(date : Date ){

    date= new Date(date.toISOString());
    let  day= <unknown>date.getUTCDate()
    let month= <unknown>(date.getMonth()+1)
    let year= <unknown>date.getFullYear()
    let hours=date.getUTCHours()
    let minutes=date.getUTCMinutes()
    let seconds=date.getUTCSeconds()
    if(day<10){
      day= "0"+day
    }
    if(month<10){
      month= "0"+month
    }
    return day+"/"+month+"/"+year+"  "+hours+":"+minutes+":"+seconds;
  }

}
