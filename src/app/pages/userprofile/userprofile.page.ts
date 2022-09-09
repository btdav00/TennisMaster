import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {AuthorizationService} from "../../service/authorization/authorization.service";
import {BehaviorSubject} from "rxjs";
import {DataService} from "../search/data.service";
import {MyinputService} from "../../service/input/myinput.service";
import {Club} from "../../model/Club";
import {User} from "../../model/User";
import {PersistentMenagerService} from "../../service/persistent/persistentMenager/persistent-menager.service";


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
  private user: User

  constructor(private route: Router, private auth: AuthorizationService, private persistent: PersistentMenagerService, private myinput: MyinputService) {
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
    }
    else{
      let userId=this.auth.getCurrentUId()
      this.persistent.loadOne(User.name, userId).subscribe(
        (object)=>{
          this.user = this.persistent.eval(Club.name, <object[]>object, true)
        }
      )
    }
  }

  logout(){
    this.auth.logout().then(() => {
      console.log('logout success')
      this.route.navigate(['login'])
    }, ()=>console.log("logout do not success"));
  }

}
