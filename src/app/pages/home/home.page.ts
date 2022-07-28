import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  page : String

  constructor() {
    this.page='partite'
  }

  setPage(page : String){
    this.page=page;
  }

}
