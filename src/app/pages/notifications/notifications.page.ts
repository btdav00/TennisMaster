import { Component, OnInit } from '@angular/core';
import {Notification} from 'src/app/model/Notification';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
})
export class NotificationsPage implements OnInit {

  notifications : Notification[]

  constructor() { }

  ngOnInit() {
  }

}
