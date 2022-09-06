import { Component, OnInit } from '@angular/core';
import {Notification} from 'src/app/model/Notification';
import {User} from "../../model/User";
import {PersistentMenagerService} from "../../service/persistent/persistentMenager/persistent-menager.service";
import {AuthorizationService} from "../../service/authorization/authorization.service";

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
})
export class NotificationsPage implements OnInit {

  notifications : Notification[]

  constructor(private persistent:PersistentMenagerService,private auth:AuthorizationService) { }

  ngOnInit() {
    this.persistent.searchNotification(null,this.auth.getCurrentUId()).subscribe(
      (obj)=>this.notifications=this.persistent.eval(Notification.name,obj)
    )
  }

}
