import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {AuthorizationService} from "../../service/authorization/authorization.service";
import {BehaviorSubject} from "rxjs";
import {DataService} from "../search/data.service";
import {MyinputService} from "../../service/input/myinput.service";
import {Club} from "../../model/Club";
import {User} from "../../model/User";
import {Notification} from "../../model/Notification"
import {PersistentMenagerService} from "../../service/persistent/persistentMenager/persistent-menager.service";
import {DateService} from "../../service/manageObject/date/date.service";
import {StorageImgService} from "../../service/storageImg/storage-img.service";
import {object} from "@angular/fire/database";


@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.page.html',
  styleUrls: ['./userprofile.page.scss'],
})
export class UserprofilePage implements OnInit {

  name: string
  surname: string
  playedmatch: string
  favouritecourt: string
  fromTabs: boolean
  private currentUserId: string
  private currentUser: User
  private user: User
  private fromtabs: boolean

  constructor(private route: Router, private auth: AuthorizationService, private persistent: PersistentMenagerService, private myinput: MyinputService, public dateservice: DateService, private imgservice: StorageImgService ) {
    this.name = "nome";
    this.surname = "cognome";
    this.playedmatch = "match giocati";
    this.favouritecourt = "superficie preferita";
  }

  ngOnInit() {
    this.currentUserId = this.auth.getCurrentUId()
    if(this.myinput.getInput()){
      // @ts-ignore
      this.user = this.myinput.getInput().user
      // @ts-ignore
      this.fromtabs = this.myinput.getInput().fromTabs
    }
    let userId=this.auth.getCurrentUId()
    this.persistent.loadOne(User.name, userId).subscribe(
      (object)=>{
        this.currentUser = this.persistent.eval(User.name, <object[]>object, true)
      }
    )
    this.persistent.getImg(User.name, this.user.id).subscribe(
      (obj)=>{this.user.imgUrl=obj}
    )
  }

  logout(){
    this.auth.logout().then(() => {
      console.log('logout success')
      this.route.navigate(['login'])
    }, ()=>console.log("logout do not success"));
  }

  followUser(){
    this.persistent.addFollower(this.user.id, this.auth.getCurrentUId())
    let notification = new Notification()
    notification.text = this.currentUser.name+" "+this.currentUser.surname+" ha iniziato a seguirti."
    notification.reference = this.currentUser
    this.persistent.addNotification(notification, this.user)
  }

  changeImg(){
    this.imgservice.catchImgCamera().then((img)=>{
      this.imgservice.uploadImg(img, User.name, this.auth.getCurrentUId())
    })
  }

}
