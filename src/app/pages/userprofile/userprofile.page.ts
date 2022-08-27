import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {AuthorizationService} from "../../service/authorization/authorization.service";


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
  constructor(private route: Router, private auth: AuthorizationService) {
    this.name = "nome";
    this.surname = "cognome";
    this.playedmatch = "match giocati";
    this.favouritecourt = "superficie preferita";
  }

  ngOnInit() {
  }

  logout(){
    this.auth.logout();
  }

}
