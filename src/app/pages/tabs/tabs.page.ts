import {Component, Input, Output, EventEmitter, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {BehaviorSubject} from "rxjs";
import {DataService} from "../search/data.service";
import {MyinputService} from "../../service/input/myinput.service";

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {

  selected : String
  fromTabs: boolean

  constructor(private router : Router, private myinput: MyinputService) {
    this.selected='home'
  }

  ngOnInit() {

  }

  showHome(){
    this.selected='home'
    this.router.navigate(['./tabs','home'])
  }

  showClub(){
    this.selected='club'
    this.router.navigate(['./tabs','homeclub'])

  }

  showProfile(){
    this.selected='profile'
    this.router.navigate(['./tabs','userprofile'])
  }

}
