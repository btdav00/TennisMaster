import { Component, OnInit } from '@angular/core';
import {Match} from 'src/app/model/Match';
import {User} from "../../model/User";
import {Set} from "../../model/Set";

@Component({
  selector: 'app-partite',
  templateUrl: './partite.page.html',
  styleUrls: ['./partite.page.scss'],
})
export class PartitePage implements OnInit {

  maches : Match[]

  constructor() { }

  ngOnInit() {
    let player1=new User()
    player1.name="Roberto"
    player1.surname="Di Stefano"
    let player2=new User()
    player2.name="Davide"
    player2.surname="Battistone"

    let set1=new Set()
    set1.gamesPlayer1=5
    set1.gamesPlayer2=4
    let set2=new Set()
    set2.gamesPlayer1=3
    set2.gamesPlayer2=5
    let set3=new Set()
    set3.gamesPlayer1=5
    set3.gamesPlayer2=2

    this.maches=[]
    for (let i = 0; i < 10; i++) {
      let match=new Match()
      match.player1=[player1]
      match.player2=[player2]
      match.type="singolo"
      match.date=new Date()
      match.sets=[set1,set2,set3]
      this.maches.push(match)
    }
  }

}
