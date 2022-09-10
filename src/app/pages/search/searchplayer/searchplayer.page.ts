import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Club} from "../../../model/Club";
import {BehaviorSubject} from "rxjs";
import {DataService} from "../data.service";
import {MyinputService} from "../../../service/input/myinput.service";
import {Router} from "@angular/router";
import {User} from "../../../model/User";
import {PersistentMenagerService} from "../../../service/persistent/persistentMenager/persistent-menager.service";

@Component({
  selector: 'app-searchplayer',
  templateUrl: './searchplayer.page.html',
  styleUrls: ['./searchplayer.page.scss'],
})
export class SearchplayerPage implements OnInit {

  public list: Array<User>=[];
  public searchedItem: any;
  fromTabs: boolean

  constructor(private myinput: MyinputService, private route: Router, private persistent: PersistentMenagerService) { }

  ngOnInit() {
    this.persistent.loadAll(User.name).subscribe(
      (users)=>{
        this.list = this.persistent.eval(User.name, users, false)
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

  sendSelected(user: User){
    this.myinput.addInput({
      user: user,
    })
    this.route.navigate(['./tabs','userprofile'])
  }

}
