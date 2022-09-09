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

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {

  selected : String
  fromTabs: boolean
  private user: User
  private club: Club

  constructor(private router : Router, private myinput: MyinputService, private auth: AuthorizationService, private persistent: PersistentMenagerService) {
    this.selected='home'
  }

  ngOnInit() {

  }

  showHome(){
    this.selected='home'
    this.router.navigate(['./tabs','home'])
  }

  showClub(){
    let userId = this.auth.getCurrentUId()
    this.persistent.getUserClub(userId).subscribe(
      (object)=>{
        if(this.club){
          this.club = this.persistent.eval(Club.name, <object[]>object, true)
        }
        else this.club = null
      }
    )
    this.myinput.addInput({
      user: this.user
    })
    this.selected='club'
    this.router.navigate(['./tabs','homeclub'])
  }

  showProfile(){
    let userId = this.auth.getCurrentUId()
    this.user = new User()
    this.persistent.loadOne(User.name, userId).subscribe(
      (object)=>{
        this.user = this.persistent.eval(User.name, object, true)
      }
    )
    this.myinput.addInput({
      user: this.user
    })
    this.selected='profile'
    this.router.navigate(['./tabs','userprofile'])
  }

}
