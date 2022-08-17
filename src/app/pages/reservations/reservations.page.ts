import { Component, OnInit } from '@angular/core';
import {formatDate} from "@angular/common";

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.page.html',
  styleUrls: ['./reservations.page.scss'],
})
export class ReservationsPage implements OnInit {

  date: string
  format: string
  myDate: string
  locale: string

  constructor() {
    this.format = 'dd/MM/yyyy';
    this.myDate = '2019-06-29';
    this.locale = 'en-US';
    this.date = formatDate(this.myDate, this.format, this.locale);
  }


  ngOnInit() {
  }

}
