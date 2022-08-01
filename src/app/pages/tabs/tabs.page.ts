import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {

  selected : String


  constructor(private router : Router) {
    this.selected='home'
  }

  showHome(){
    this.selected='home'
    this.router.navigate(['./tabs','home'])
  }

  showClub(){
    this.selected='club'
    this.router.navigate(['./tabs','clubprofile'])

  }

  showProfile(){
    this.selected='profile'
    this.router.navigate(['./tabs','userprofile'])
  }

  ngOnInit() {
  }

}
