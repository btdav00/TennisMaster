import { Component, OnInit } from '@angular/core';
import {Match} from "../../model/Match";
import {Club} from "../../model/Club";
import {Router} from "@angular/router";
import {MyinputService} from "../../service/input/myinput.service";
import {PersistentMenagerService} from "../../service/persistent/persistentMenager/persistent-menager.service";

@Component({
  selector: 'app-matchdetails',
  templateUrl: './matchdetails.page.html',
  styleUrls: ['./matchdetails.page.scss'],
})
export class MatchdetailsPage implements OnInit {

  public match: Match
  public club: Club

  constructor(private router : Router , private input : MyinputService, private persistent : PersistentMenagerService) {
    // @ts-ignore
    this.match=this.input.getInput().match
    // @ts-ignore
    this.club=this.input.getInput().club
  }

  ngOnInit() {
    console.log(this.club)
  }

  stringDate(date : Date ){

    date= new Date(date.toISOString());
    let  day= <unknown>date.getUTCDate()
    let month= <unknown>(date.getMonth()+1)
    let year= <unknown>date.getFullYear()
    let hours=date.getUTCHours()
    let minutes=date.getUTCMinutes()
    let seconds=date.getUTCSeconds()
    if(day<10){
      day= "0"+day
    }
    if(month<10){
      month= "0"+month
    }
    return day+"/"+month+"/"+year+"  "+hours+":"+minutes+":"+seconds;
  }

  goToPostMatch(){
    this.input.addInput({
      match : this.match,
      club : this.club,
    })
    this.router.navigate(['postsmatch'])
  }

}
