import { Component, OnInit } from '@angular/core';
import {Notification} from 'src/app/model/Notification';
import {User} from "../../model/User";

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
})
export class NotificationsPage implements OnInit {

  notifications : Notification[]

  constructor() { }

  ngOnInit() {
    this.notifications=[]
    for (let i = 0; i < 10; i++) {
      let n1=new Notification();
      let u1=new User()
      u1.name='Roberto'
      u1.surname='Di Stefano'
      n1.text='ha aggiunto una nuova partita in cui hai partecipato'
      n1.reference=u1
      this.notifications.push(n1)
    }
  }

}
