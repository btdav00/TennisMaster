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
  private club: Club
  private currentUser: User
  private userClub: boolean

  constructor(private authorization: AuthorizationService, private persistent: PersistentMenagerService, private myinput: MyinputService, private route: Router) {
    this.page='profilo'
  }

  setPage(page : String){
    this.page = page;
  }

  ngOnInit() {
    let userId = this.authorization.getCurrentUId()
    if(this.myinput.getInput()){
      // @ts-ignore
      this.club = this.myinput.getInput().club
      this.userClub = true
    }
    else{
      let userId=this.authorization.getCurrentUId()
      this.persistent.getUserClub(userId).subscribe(
        (object)=>{
          if(object.length>1){
            this.club = this.persistent.eval(Club.name, <object[]>object, true)
            this.userClub = true
          }
          else this.userClub=false
        }
      )
    }
  }

  inputToReview(){
    this.myinput.addInput({
      club: this.club
    })
    this.route.navigate(["reviews"])
  }

}
