import { Component, OnInit } from '@angular/core';
import {Booking} from "../../model/Booking";
import {Club} from "../../model/Club";
import {PersistentMenagerService} from "../../service/persistent/persistentMenager/persistent-menager.service";
import {AuthorizationService} from "../../service/authorization/authorization.service";

@Component({
  selector: 'app-mybookings',
  templateUrl: './mybookings.page.html',
  styleUrls: ['./mybookings.page.scss'],
})
export class MybookingsPage implements OnInit {

  public bookings : Booking[]

  constructor(private persistent:PersistentMenagerService,private auth:AuthorizationService) {}

  ngOnInit() {
    this.persistent.searchBooking(null,this.auth.getCurrentUId()).subscribe(
      (result)=>this.bookings=this.persistent.eval(Booking.name,result)
    )
  }

}
