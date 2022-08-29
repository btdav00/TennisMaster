import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-homesearch',
  templateUrl: './homesearch.page.html',
  styleUrls: ['./homesearch.page.scss'],
})
export class HomesearchPage implements OnInit {

  page: String

  constructor() {
    this.page='players'
  }

  ngOnInit() {
  }

  setPage(page : String){
    this.page=page;
  }

}
