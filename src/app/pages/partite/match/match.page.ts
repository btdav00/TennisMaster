import { Component, Input, OnInit } from '@angular/core';
import {Match} from 'src/app/model/Match'
import {Router} from "@angular/router";
import {Club} from "../../../model/Club";
import {Place} from "../../../model/Place";
import {MyinputService} from "../../../service/input/myinput.service";

@Component({
  selector: 'app-match',
  templateUrl: './match.page.html',
  styleUrls: ['./match.page.scss'],
})
export class MatchPage implements OnInit {

  @Input() match : Match

  constructor(private router : Router, private input : MyinputService) { }

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

    this.input.addInput({
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

    this.input.addInput({
      match : this.match,
      club : club
    })
    this.router.navigate(['postsmatch'])
  }

}
