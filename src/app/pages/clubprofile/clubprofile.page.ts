import { Component, OnInit } from '@angular/core';
import {Club} from "../../model/Club";
import {MyinputService} from "../../service/input/myinput.service";
import {User} from "../../model/User";
import {collection, getFirestore, query, where} from "firebase/firestore";
import {valueReferenceToExpression} from "@angular/compiler-cli/src/ngtsc/annotations/src/util";
import {AuthorizationService} from "../../service/authorization/authorization.service";
import {PersistentMenagerService} from "../../service/persistent/persistentMenager/persistent-menager.service";
import {object} from "@angular/fire/database";
import {Router} from "@angular/router";

@Component({
  selector: 'app-clubprofile',
  templateUrl: './clubprofile.page.html',
  styleUrls: ['./clubprofile.page.scss'],
})
export class ClubprofilePage implements OnInit {

  page: String
  public club: Club
  public currentUserClub : Club
  private userClub: boolean

  constructor(private authorization: AuthorizationService, private persistent: PersistentMenagerService, private myinput: MyinputService, private route: Router) {
  }

  setPage(page : String){
    this.page = page;
  }

  ngOnInit() {
    this.page='profilo'
    let userId = this.authorization.getCurrentUId()
    if(this.myinput.getInput()){
      // @ts-ignore
      this.persistent.loadOne(Club.name,this.myinput.getInput().club).subscribe(
        (obj)=>{
          this.club=this.persistent.eval(Club.name,obj,true)
          this.userClub = true
        }
      )
    }
    this.persistent.getUserClub(this.authorization.getCurrentUId()).subscribe(
      (object)=>{
        if(object.length>0){
          this.currentUserClub = this.persistent.eval(Club.name, <object[]>object, true)
        }
        else this.currentUserClub=null
      }
    )
  }

  joinClub(){
    this.persistent.addUserToClub(this.authorization.getCurrentUId(),this.club.id)
  }

  leaveClub(){
    this.persistent.addUserToClub(this.authorization.getCurrentUId(),'')
  }

  inputToReview(){
    this.myinput.addInput({
      club: this.club
    })
    this.route.navigate(["reviews"])
  }

}
