import { Component, Input, OnInit } from '@angular/core';
import {Match} from 'src/app/model/Match'
import {Router} from "@angular/router";
import {Club} from "../../../model/Club";
import {Place} from "../../../model/Place";
import {MyinputService} from "../../../service/input/myinput.service";
import {PersistentMenagerService} from "../../../service/persistent/persistentMenager/persistent-menager.service";

@Component({
  selector: 'app-match',
  templateUrl: './match.page.html',
  styleUrls: ['./match.page.scss'],
})
export class MatchPage implements OnInit {

  @Input() match : Match
  private club : Club

  constructor(private router : Router, private input : MyinputService , private persistent:PersistentMenagerService) { }

  ngOnInit() {
    this.persistent.getClubMatch(this.match.id).subscribe(
      (obj)=>this.club=this.persistent.eval(Club.name,<object[]>obj,true)
    )
  }

  goToMatchDetail(){
    this.input.addInput({
      match : this.match,
      club : this.club,
    })
    this.router.navigate(['matchdetails'])
  }

  goToPostMatch(){
    this.input.addInput({
      match : this.match,
      club : this.club,
    })
    this.router.navigate(['postsmatch'])
  }

}
