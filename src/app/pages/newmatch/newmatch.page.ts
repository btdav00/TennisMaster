import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {Match} from "../../model/Match";
import {Club} from "../../model/Club";
import {User} from "../../model/User";
import {PersistentMenagerService} from "../../service/persistent/persistentMenager/persistent-menager.service";
import {AuthorizationService} from "../../service/authorization/authorization.service";

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





  constructor(private persistent:PersistentMenagerService,private auth:AuthorizationService) {

  }

  ngOnInit() {
    if(!this.mood)this.mood=''
    if(!this.match)this.match=new Match()
    if(!this.match.player1)this.match.player1=[]
    if(!this.match.player2)this.match.player2=[]
    if(!this.match.sets)this.match.sets=[]
    if(!this.match.type)this.match.type='doppio'
    /*
    if(!this.match.publisher){
      const currentId=this.auth.getCurrentUId()
      this.persistent.loadOne(User.name,currentId).subscribe(
        (obj)=>this.match.publisher=this.persistent.eval(User.name,obj,true)
      )
    }
     */
  }

  setMood(mood:String){
    if(this.mood!=mood)this.mood=mood
    else this.mood=''
  }

  setClub(club:Club){
    this.club=club

  }

  setTeams(teams){
    this.match.player1=teams.team1
    this.match.player2=teams.team2
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
