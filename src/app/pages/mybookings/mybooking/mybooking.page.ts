import {Component, Input, OnInit} from '@angular/core';
import {Booking} from "../../../model/Booking";
import {Club} from "../../../model/Club";
import {PersistentMenagerService} from "../../../service/persistent/persistentMenager/persistent-menager.service";
import {DateService} from "../../../service/manageObject/date/date.service";

@Component({
  selector: 'app-mybooking',
  templateUrl: './mybooking.page.html',
  styleUrls: ['./mybooking.page.scss'],
})
export class MybookingPage implements OnInit {

  @Input() booking : Booking
  club : Club

  constructor(private persistent: PersistentMenagerService , private dateService : DateService) { }

  ngOnInit() {
    if(this.booking){
      this.persistent.getClubBooking(this.booking.id).subscribe(
        (obj)=>this.club=this.persistent.eval(Club.name,<object[]>obj,true)
      )
    }
  }

  stringDate(date : Date ){

    return this.dateService.getStringDate(date)
  }

  delete(){
    this.persistent.deleteBooking(this.booking.id)
  }

  enable(){
    let today=new Date()
    if(this.dateService.getStartDay(today).getTime()<this.dateService.getStartDay(this.booking.date).getTime()) return true
    else return false
  }

}
