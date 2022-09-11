import { Component, OnInit } from '@angular/core';
import {Match} from 'src/app/model/Match';
import {User} from "../../model/User";
import {Set} from "../../model/Set";
import {PersistentMenagerService} from "../../service/persistent/persistentMenager/persistent-menager.service";
import {AuthorizationService} from "../../service/authorization/authorization.service";

@Component({
  selector: 'app-partite',
  templateUrl: './partite.page.html',
  styleUrls: ['./partite.page.scss'],
})
export class PartitePage implements OnInit {

  maches : Match[]

  constructor(private persistent:PersistentMenagerService, private auth:AuthorizationService) { }

  ngOnInit() {
    this.persistent.getMatchOfFollowee(this.auth.getCurrentUId()).subscribe(
      (objs)=>this.maches=this.persistent.eval(Match.name,<object[]>objs)
    )
    /*
    this.persistent.loadAll(Match.name).subscribe(
      (objs)=>{this.maches=this.persistent.eval(Match.name,objs)}
    )
     */
  }

}
