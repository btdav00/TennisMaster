import { Component, OnInit } from '@angular/core';
import {MyinputService} from "../../service/input/myinput.service";
import {Club} from "../../model/Club";
import {Booking} from "../../model/Booking";
import {Court} from "../../model/Court";
import {DateService} from "../../service/manageObject/date/date.service";
import {PersistentMenagerService} from "../../service/persistent/persistentMenager/persistent-menager.service";
import {User} from "../../model/User";
import {AuthorizationService} from "../../service/authorization/authorization.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-payments',
  templateUrl: './payments.page.html',
  styleUrls: ['./payments.page.scss'],
})
export class PaymentsPage implements OnInit {

  public club : Club
  private idClub
  public booking : Booking
  public court : Court
  private currentUser : User

  constructor(private route : Router, private myInput : MyinputService , public dateService : DateService, private persistent : PersistentMenagerService , private auth : AuthorizationService) { }

  ngOnInit() {
    //@ts-ignore
    this.idClub=this.myInput.getInput().club
    //@ts-ignore
    this.booking=this.myInput.getInput().booking
    //@ts-ignore
    this.court=this.myInput.getInput().court
    this.persistent.loadOne(User.name,this.auth.getCurrentUId()).subscribe(
      (obj)=>this.currentUser=this.persistent.eval(User.name,obj,true)
    )
    this.persistent.loadOne(Club.name,this.idClub).subscribe(
      (obj)=>this.club=this.persistent.eval(Club.name,obj,true)
    )
  }

  indorString(){
    if(this.court.indoor) return 'indoor'
    else return 'outdoor'
  }

  changeMetod(val: number){
  }

  submit(){
    this.booking.payment=false
    this.persistent.addBooking(this.currentUser,this.booking,this.club,this.court)
    this.route.navigate(['tabs'])
  }

}
