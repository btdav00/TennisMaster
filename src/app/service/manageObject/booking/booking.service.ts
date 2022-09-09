import { Injectable } from '@angular/core';
import {collection, getFirestore, query, where} from "firebase/firestore";
import {Booking} from "../../../model/Booking";
import {Club} from "../../../model/Club";
import {Court} from "../../../model/Court";

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  private courts: any;
  private times: any;
  private timeClicked: number
  private color: String
  private arrayTimes = [];
  private arrayCourts = [];
  private selected: Booking;

  constructor() { }

  bookingCheck(club: Club, court: Court, time: Number){
    /*
    const db = getFirestore();
    const colcourt = collection(db, 'court')
    const colclub = collection(db, 'club')
    const coltime = collection(db, 'time')
    this.courts.forEach(function (court){
      this.times.forEach(function(time){
        this.arrayTimes[time]
      })
      this.arrayCourts[court]=(this.arrayTimes)
      this.arrayTimes = []
    })
     */
    return true
  }

}
