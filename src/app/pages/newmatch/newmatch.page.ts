import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {Match} from "../../model/Match";
import {Club} from "../../model/Club";

@Component({
  selector: 'app-newmatch',
  templateUrl: './newmatch.page.html',
  styleUrls: ['./newmatch.page.scss'],
})
export class NewmatchPage implements OnInit {

  //match
  public match: Match

  //mood
  mood:String;

  //club
  club:Club

  constructor() {

  }

  ngOnInit() {
    this.mood=''
    this.match=new Match()
    this.match.player1=[]
    this.match.player2=[]
    this.match.sets=[]
    this.match.type='doppio'

  }






  setMood(mood:String){
    if(this.mood!=mood)this.mood=mood
    else this.mood=''
  }

  setClub(club:Club){
    this.club=club

  }

  setTeam1(team){
    this.match.player1=team
  }
  setTeam2(team){
    this.match.player2=team
  }

  setType(type){
    this.match.type=type
    if(type=="singolo") {
      if (this.match.player1.length > 1) this.match.player1 = [this.match.player1[0]]
      if (this.match.player2.length > 1) this.match.player2 = [this.match.player2[0]]
    }
  }

  setDate(date){
    this.match.date=date
  }

  setSets(sets){
    this.match.sets=sets
  }




}
