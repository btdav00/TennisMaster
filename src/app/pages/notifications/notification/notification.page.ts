import {Component, Input, OnInit} from '@angular/core';
import {Notification} from 'src/app/model/Notification';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.page.html',
  styleUrls: ['./notification.page.scss'],
})
export class NotificationPage implements OnInit {

  @Input() notification : Notification

  constructor() { }

  ngOnInit() {
  }

}
