import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Club} from "../../../model/Club";
import {BehaviorSubject} from "rxjs";
import {DataService} from "../data.service";
import {MyinputService} from "../../../service/input/myinput.service";
import {PersistentMenagerService} from "../../../service/persistent/persistentMenager/persistent-menager.service";
import {User} from "../../../model/User";
import {AuthorizationService} from "../../../service/authorization/authorization.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-searchclub',
  templateUrl: './searchclub.page.html',
  styleUrls: ['./searchclub.page.scss'],
})
export class SearchclubPage implements OnInit {

  public list: Array<Club>=[];
  public searchedItem: any;
  fromTabs:boolean;
  searched: string

  constructor(private myinput: MyinputService, private persistent: PersistentMenagerService, private authorization: AuthorizationService, private route:Router) { }

  ngOnInit() {
    this.persistent.loadAll(Club.name).subscribe(
      (clubs)=>{
        this.list = this.persistent.eval(Club.name, clubs, false)
        this.searchedItem = this.list
      }
    )
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

  sendSelected(club: Club){
    this.myinput.addInput({
      club: club,
    })
    this.route.navigate(["homeclub"])
  }

}
