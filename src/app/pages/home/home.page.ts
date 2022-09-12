import {AfterViewChecked, Component, OnInit} from '@angular/core';
import {TabsPageService} from "../../service/tabspage/tabs-page.service";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit , AfterViewChecked {

  page : String

  constructor( private tabsService : TabsPageService) {
    this.page='partite'
  }

  ngAfterViewChecked(){
    this.tabsService.setPage('home')
  }

  ngOnInit() {
  }

  setPage(page : String){
    this.page=page;
  }

}
