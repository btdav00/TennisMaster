import { Component, OnInit } from '@angular/core';
import {MyinputService} from "../../service/input/myinput.service";
import {Club} from "../../model/Club";
import {PersistentMenagerService} from "../../service/persistent/persistentMenager/persistent-menager.service";
import {AuthorizationService} from "../../service/authorization/authorization.service";

@Component({
  selector: 'app-homeclub',
  templateUrl: './homeclub.page.html',
  styleUrls: ['./homeclub.page.scss'],
})
export class HomeclubPage implements OnInit {

  page: String
  public club: boolean
  public fromTabs : boolean
  private clubId : string

  constructor(private myinput: MyinputService , private persistent: PersistentMenagerService, private auth: AuthorizationService) {
    this.page='profilo'
  }

  ngOnInit() {
    // @ts-ignore
    this.clubId = this.myinput.getInput().club
    // @ts-ignore
    this.fromTabs = this.myinput.getInput().fromTabs
    if(this.fromTabs){
      this.persistent.getUserClub(this.auth.getCurrentUId()).subscribe(
        (obj)=>{
          if(obj.length>0)this.club=true
          else this.club=false
        }
      )
    }
    else if(this.clubId){
      this.myinput.addInput({
        club: this.clubId
      })
      this.club=true
    }else this.club=false
  }

  setPage(page : String){
    this.page=page;
    this.myinput.addInput(
      {
        club : this.clubId,
        fromTabs : this.fromTabs
      }
    )
  }

}
