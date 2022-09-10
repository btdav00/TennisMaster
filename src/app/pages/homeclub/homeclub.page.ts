import { Component, OnInit } from '@angular/core';
import {MyinputService} from "../../service/input/myinput.service";
import {Club} from "../../model/Club";

@Component({
  selector: 'app-homeclub',
  templateUrl: './homeclub.page.html',
  styleUrls: ['./homeclub.page.scss'],
})
export class HomeclubPage implements OnInit {

  page: String
  public club: boolean

  constructor(private myinput: MyinputService) {
    this.page='profilo'
  }

  ngOnInit() {
    // @ts-ignore
    let club = this.myinput.getInput().club
    if(club){
      this.club=true
    }else this.club=false
    this.myinput.addInput({
      club: club
    })
  }

  setPage(page : String){
    this.page=page;
  }

}
