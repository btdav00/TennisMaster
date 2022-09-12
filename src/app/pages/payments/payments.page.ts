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
import {FormControl, FormGroup} from "@angular/forms";

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
  public method: number
  public dataCard: FormGroup;

  constructor(private myInput : MyinputService , public dateService : DateService, private persistent : PersistentMenagerService , private auth : AuthorizationService, private route: Router) {
    this.method=1
    this.dataCard = new FormGroup({
      cardNumber: new FormControl(''),
      month: new FormControl(''),
      year: new FormControl(''),
      cvc: new FormControl(''),
    });
  }

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

  changeMethod(selected: number){
    this.method = selected
  }

  disabled(){
    let date = new Date()
    if(this.method==2) return false
    if(this.method==1){
      const regolarExpress = /^[0-9]{16}$/;
      const regolarExpressmonth = /^[0-9]{2}$/;
      const regolarExpressyear = /^[0-9]{4}$/;
      const regolarExpresscvc = /^[0-9]{3}$/;
      if(!regolarExpress.test(this.dataCard.value.cardNumber)) return true
      if(!regolarExpressmonth.test(this.dataCard.value.month) || <number>this.dataCard.value.month<0 || <number>this.dataCard.value.month>12) return true
      if(!regolarExpressyear.test(this.dataCard.value.year)) return true
      if(!regolarExpresscvc.test(this.dataCard.value.cvc)) return true
      if(<number>this.dataCard.value.year<date.getFullYear() || (<number>this.dataCard.value.year==date.getFullYear() && <number>this.dataCard.value.month<date.getMonth()+1)) return true
    }
  }

  submit2(){
    this.booking.payment=false
    this.persistent.addBooking(this.currentUser,this.booking,this.club,this.court)
    this.route.navigate(["tabs"])
  }

  submit1(){
    this.booking.payment=true
    this.persistent.addBooking(this.currentUser,this.booking,this.club,this.court)
    this.route.navigate(["tabs"])
  }

}
