import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-homeclub',
  templateUrl: './homeclub.page.html',
  styleUrls: ['./homeclub.page.scss'],
})
export class HomeclubPage implements OnInit {

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
