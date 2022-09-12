import { Injectable } from '@angular/core';
import {collection, getFirestore, query, where} from "firebase/firestore";
import {Booking} from "../../../model/Booking";
import {Club} from "../../../model/Club";
import {Court} from "../../../model/Court";

@Injectable({
  providedIn: 'root'
})
export class BookingService {



  constructor() { }

  bookingCheck(bookingsDay: Booking[], courtNumber: number, time: number){
    let result=true
    for (const booking of bookingsDay) {
      if(booking.startHour<=time && booking.numberHour-1>=time-booking.startHour && booking.courtNumber==courtNumber)result=false
    }
    return result
  }

}
