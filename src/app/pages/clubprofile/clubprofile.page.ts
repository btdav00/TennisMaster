import { Component, OnInit } from '@angular/core';
import {Club} from "../../model/Club";
import {MyinputService} from "../../service/input/myinput.service";

@Component({
  selector: 'app-clubprofile',
  templateUrl: './clubprofile.page.html',
  styleUrls: ['./clubprofile.page.scss'],
})
export class ClubprofilePage implements OnInit {

  page: String
  private club: Club

  constructor(private myInput: MyinputService) {
    this.page='profilo'
  }

  setPage(page : String){
    this.page=page;
  }

  ngOnInit() {
    // @ts-ignore
    this.club=this.myInput.getInput().club
  }

}
