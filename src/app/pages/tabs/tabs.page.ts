import {Component, Input, Output, EventEmitter, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {BehaviorSubject} from "rxjs";
import {DataService} from "../search/data.service";

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {

  selected : String
  fromTabs: boolean

  constructor(private router : Router, private data: DataService) {
    this.selected='home'
  }

  ngOnInit() {
    this.data.currentFrom.subscribe(fromTabs => this.fromTabs = fromTabs)
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

  sendFrom() {
    this.data.changeFromTabs(true)//fare la stessa cosa nella ricerca (impostando fromTabs su false) e usare la pagina dell'utente come padre
  }

}
