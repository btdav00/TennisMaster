import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.page.html',
  styleUrls: ['./calendar.page.scss'],
})
export class CalendarPage implements OnInit {
  date: FormGroup;
  static url: String;
  url1: String;

  constructor() {
    console.log(CalendarPage.url);
    this.date = new FormGroup({
      date: new FormControl(''),
    });
    this.url1=CalendarPage.url; 
  }

  static setUrl(Url: String) {
    CalendarPage.url = Url;
    console.log(CalendarPage.url);
  }

  ngOnInit() {}
}
