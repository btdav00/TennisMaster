import { Component, Input, OnInit } from '@angular/core';
import {Match} from 'src/app/model/Match'
import {Router} from "@angular/router";
import {MyInput} from "../../../service/input";
import {Club} from "../../../model/Club";
import {Place} from "../../../model/Place";

@Component({
  selector: 'app-match',
  templateUrl: './match.page.html',
  styleUrls: ['./match.page.scss'],
})
export class MatchPage implements OnInit {

  @Input() match : Match

  constructor(private router : Router) { }

  ngOnInit() {
  }

  goToMatchDetail(){

    let place=new Place()
    place.cap=67051
    place.city="Avezzano"
    place.houseNumber=25
    place.street="Via Roma"

    let club=new Club()
    club.name="Circolo Di Avezzano"
    club.place=place

    MyInput.addInput({
      match : this.match,
      club : club
    })
    this.router.navigate(['matchdetails'])
  }

  goToPostMatch(){
    let place=new Place()
    place.cap=67051
    place.city="Avezzano"
    place.houseNumber=25
    place.street="Via Roma"

    let club=new Club()
    club.name="Circolo Di Avezzano"
    club.place=place

    MyInput.addInput({
      match : this.match,
      club : club
    })
    this.router.navigate(['postsmatch'])
  }

}
