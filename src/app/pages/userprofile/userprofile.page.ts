import { Component, OnInit } from '@angular/core';

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
  constructor() {
    this.name = "nome";
    this.surname = "cognome";
    this.playedmatch = "match giocati";
    this.favouritecourt = "superficie preferita";
  }

  ngOnInit() {
  }

}
