import { Component, OnInit } from '@angular/core';
import {Club} from "../../model/Club";
import {MyinputService} from "../../service/input/myinput.service";
import {User} from "../../model/User";
import {collection, getFirestore, query, where} from "firebase/firestore";
import {valueReferenceToExpression} from "@angular/compiler-cli/src/ngtsc/annotations/src/util";

@Component({
  selector: 'app-clubprofile',
  templateUrl: './clubprofile.page.html',
  styleUrls: ['./clubprofile.page.scss'],
})
export class ClubprofilePage implements OnInit {

  page: String
  private club: any
  private currentUser: User

  constructor(private myInput: MyinputService) {
    this.page='profilo'
  }

  setPage(page : String){
    this.page = page;
  }

  ngOnInit() {
    const db = getFirestore();
    const col = collection(db, 'user')
    this.club = query(col, where('club','==',this.currentUser));
  }

}
