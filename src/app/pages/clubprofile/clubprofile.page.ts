import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-clubprofile',
  templateUrl: './clubprofile.page.html',
  styleUrls: ['./clubprofile.page.scss'],
})
export class ClubprofilePage implements OnInit {

  page: String

  constructor() {
    this.page='profilo'
  }

  setPage(page : String){
    this.page=page;
  }

  ngOnInit() {
  }

}
