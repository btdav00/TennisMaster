import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {AuthorizationService} from "../../service/authorization/authorization.service";
import {BehaviorSubject} from "rxjs";
import {DataService} from "../search/data.service";


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

  constructor(private route: Router, private auth: AuthorizationService, private data: DataService) {
    this.name = "nome";
    this.surname = "cognome";
    this.playedmatch = "match giocati";
    this.favouritecourt = "superficie preferita";
  }

  ngOnInit() {
    this.data.currentFrom.subscribe(fromTabs => this.fromTabs = fromTabs)
  }

  logout(){
    this.auth.logout().then(() => {
      console.log('logout success')
      this.route.navigate(['login'])
    }, ()=>console.log("logout do not success"));
  }

}
