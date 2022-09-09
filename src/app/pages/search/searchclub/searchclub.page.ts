import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Club} from "../../../model/Club";
import {BehaviorSubject} from "rxjs";
import {DataService} from "../data.service";
import {MyinputService} from "../../../service/input/myinput.service";
import {PersistentMenagerService} from "../../../service/persistent/persistentMenager/persistent-menager.service";
import {User} from "../../../model/User";
import {AuthorizationService} from "../../../service/authorization/authorization.service";

@Component({
  selector: 'app-searchclub',
  templateUrl: './searchclub.page.html',
  styleUrls: ['./searchclub.page.scss'],
})
export class SearchclubPage implements OnInit {

  public list: Array<Object>=[];
  public searchedItem: any;
  fromTabs:boolean;
  searched: string
  private clubs: []

  constructor(private myinput: MyinputService, private persistent: PersistentMenagerService, private authorization: AuthorizationService) { }

  ngOnInit() {
    this.myinput.currentFrom.subscribe(fromTabs => this.fromTabs = fromTabs)
    this.myinput.currentSearched.subscribe(searched => this.searched = searched)
  }

  _ionChange(event){
    const val=event.target.value;

    if(val && val!=''){
      this.searchedItem=this.list.filter((item: any)=>{
        let test=item.name
        return (test.toLowerCase().indexOf(val.toLowerCase())>-1)
      })
    }
    else if(val=='')this.searchedItem=this.list
  }

  changeFrom() {
    this.myinput.changeFromTabs(false)
  }

  changeSearched(){
    this.myinput.changeSearched("argomento della form")
  }

  searchedList(){
    this.persistent.loadAll(Club.name).subscribe(
      (clubs)=>{
        this.clubs = this.persistent.eval(Club.name, clubs, true)
      }
    )
    for(this.clubs as club){
      this.changeSearched().split....
    }
  }


}
