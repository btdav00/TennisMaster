import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {

  selected : String

  constructor() {
    this.selected='home'
  }

  showHome(){
    this.selected='home'
  }

  showClub(){
    this.selected='club'
  }

  showProfile(){
    this.selected='profile'
  }

  ngOnInit() {
  }

}
