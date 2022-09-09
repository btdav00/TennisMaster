import { Component, OnInit } from '@angular/core';
import {Club} from "../../model/Club";
import {MyinputService} from "../../service/input/myinput.service";
import {User} from "../../model/User";
import {collection, getFirestore, query, where} from "firebase/firestore";
import {valueReferenceToExpression} from "@angular/compiler-cli/src/ngtsc/annotations/src/util";
import {AuthorizationService} from "../../service/authorization/authorization.service";
import {PersistentMenagerService} from "../../service/persistent/persistentMenager/persistent-menager.service";

@Component({
  selector: 'app-clubprofile',
  templateUrl: './clubprofile.page.html',
  styleUrls: ['./clubprofile.page.scss'],
})
export class ClubprofilePage implements OnInit {

  page: String
  private club: Club
  private currentUser: User
  private fromTabs: any

  constructor(private authorization: AuthorizationService, private persistent: PersistentMenagerService, private myinput: MyinputService) {
    this.page='profilo'
  }

  setPage(page : String){
    this.page = page;
  }

  ngOnInit() {
    let userId = this.authorization.getCurrentUId()
    this.persistent.loadOne(User.name, userId).subscribe(
      (users)=>{
        this.currentUser = this.persistent.eval(User.name, users, true)
      }
    )
    this.club = this.persistent.getUserClub(userId)
    this.fromTabs = this.myinput.currentFrom
  }

}
