import { Component, OnInit } from '@angular/core';
import {Booking} from "../../model/Booking";
import {Club} from "../../model/Club";

@Component({
  selector: 'app-mybookings',
  templateUrl: './mybookings.page.html',
  styleUrls: ['./mybookings.page.scss'],
})
export class MybookingsPage implements OnInit {

  public bookings : Booking[]

  constructor() {}

  ngOnInit() {
    let club=new Club()
    let date=new Date()
    this.bookings=[]
    for (let i = 0; i < 10; i++) {
      let b1=new Booking()
      b1.date=date
      this.bookings.push(b1)
    }
  }

}
