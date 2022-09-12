import { Component, Input, Output, EventEmitter, OnInit, AfterViewChecked } from '@angular/core';
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
import {TabsPageService} from "../../service/tabspage/tabs-page.service";


@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.page.html',
  styleUrls: ['./userprofile.page.scss'],
})
export class UserprofilePage implements OnInit , AfterViewChecked {

  fromTabs: boolean
  private idUser: string
  public jastFollowed : boolean
  public currentUserId: string
  private currentUser: User
  public user: User
  public fromtabs: boolean

  constructor( private tabsService : TabsPageService ,private route: Router, private auth: AuthorizationService, private persistent: PersistentMenagerService, private myinput: MyinputService, public dateservice: DateService, private imgservice: StorageImgService ) {
  }

  ngAfterViewChecked(){
    this.tabsService.setPage('profile')
  }

  ngOnInit() {
    this.currentUserId = this.auth.getCurrentUId()
    if(this.myinput.getInput()){
      // @ts-ignore
      this.idUser=this.myinput.getInput().user
      // @ts-ignore
      this.fromtabs = this.myinput.getInput().fromTabs
    }


    this.persistent.loadOne(User.name,this.idUser).subscribe(
      (obj)=>this.user=this.persistent.eval(User.name, <object[]>obj, true)
    )

    let userId=this.auth.getCurrentUId()
    this.persistent.loadOne(User.name, userId).subscribe(
      (object)=>{
        this.currentUser = this.persistent.eval(User.name, <object[]>object, true)
      }
    )
    this.persistent.existFollower(this.idUser,this.auth.getCurrentUId()).subscribe(
      (exist)=>this.jastFollowed=exist
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

  noFollowUser(){
    this.persistent.deleteFollowed(this.auth.getCurrentUId(),this.user.id)
  }

  changeImg(){
    this.imgservice.catchImgCamera().then((img)=>{
      this.imgservice.uploadImg(img, User.name, this.auth.getCurrentUId())
    })
  }

}
