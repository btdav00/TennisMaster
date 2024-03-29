import {Component, Input, Output, EventEmitter, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {BehaviorSubject} from "rxjs";
import {DataService} from "../search/data.service";
import {MyinputService} from "../../service/input/myinput.service";
import {User} from "../../model/User";
import {PersistentMenagerService} from "../../service/persistent/persistentMenager/persistent-menager.service";
import {AuthorizationService} from "../../service/authorization/authorization.service";
import {Review} from "../../model/Review";
import {Club} from "../../model/Club";
import {object} from "@angular/fire/database";
import {TabsPageService} from "../../service/tabspage/tabs-page.service";

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {

  fromTabs: boolean
  private user: User
  private club: Club

  constructor(private router : Router, private myinput: MyinputService, private auth: AuthorizationService, private persistent: PersistentMenagerService , public tabsService: TabsPageService) {
  }

  ngOnInit() {
    let userId = this.auth.getCurrentUId()
    this.persistent.getUserClub(userId).subscribe(
      (object)=>{
        this.club = this.persistent.eval(Club.name, <object[]>object, true)
      }
    )
    this.persistent.loadOne(User.name, userId).subscribe(
      (object)=>{
        this.user = this.persistent.eval(User.name, object, true)
      }
    )
  }

  showHome(){
    this.router.navigate(['./tabs','home'])
  }

  showClub(){
    if(this.club){
      this.myinput.addInput({
        club: this.club.id,
        fromTabs: true
      })
    }
    else {
      this.myinput.addInput({
        club: '',
        fromTabs: true
      })
    }
    this.router.navigate(['./tabs','homeclub'])
  }

  showProfile(){
    this.myinput.addInput({
      user: this.auth.getCurrentUId(),
      fromTabs: true
    })
    this.router.navigate(['./tabs','userprofile'])
  }

}
