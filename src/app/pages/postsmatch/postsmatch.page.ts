import {Component, OnInit, ViewChild} from '@angular/core';
import {IonContent} from "@ionic/angular";
import {Comment} from "../../model/Comment";
import {User} from "../../model/User";
import {Match} from "../../model/Match";
import {Club} from "../../model/Club";
import {Place} from "../../model/Place";
import {Router} from "@angular/router";
import {MyinputService} from "../../service/input/myinput.service";
import {PersistentMenagerService} from "../../service/persistent/persistentMenager/persistent-menager.service";
import {AuthorizationService} from "../../service/authorization/authorization.service";

@Component({
  selector: 'app-postsmatch',
  templateUrl: './postsmatch.page.html',
  styleUrls: ['./postsmatch.page.scss'],
})
export class PostsmatchPage implements OnInit {

  match : Match
  club : Club
  newMsg : string
  msgs : Comment[]

  @ViewChild(IonContent) content: IonContent

  constructor(private router : Router , private input : MyinputService,private persistent:PersistentMenagerService,private auth:AuthorizationService) {

  }

  ngOnInit() {
    // @ts-ignore
    this.match=this.input.getInput().match
    // @ts-ignore
    this.club=this.input.getInput().club

    this.persistent.searchComment(null,this.match.id)
  }

  resultMatch(match: Match,required=null , mood='number') {

    let point1 = 0
    let point2 = 0
    for (let item of match.sets) {
      if (item.gamesPlayer1 > item.gamesPlayer2) point1 = point1 + 1
      if (item.gamesPlayer2 > item.gamesPlayer1) point2 = point2 + 1
    }
    if (required == null){
      if (mood=="string") return point1+"-"+point2
      else return [point1, point2]
    }
    else if (required == 2) return point2
    else return point1
  }

  goToMatchDetail(){

    this.input.addInput({
      match : this.match,
      club : this.club
    })
    this.router.navigate(['matchdetails'])
  }



  sendPost(){
    //create
    let user:User
    this.persistent.loadOne(User.name,this.auth.getCurrentUId()).subscribe(
      (obj)=>user=this.persistent.eval(User.name,<object[]>obj,true)
    )
    let post=new Comment()
    post.text=this.newMsg
    post.writer=user
    post.time=new Date()

    //add
    this.msgs.push(post)


    //reset
    this.newMsg=''
    setTimeout(()=>{
      this.content.scrollToBottom(200)
    });
  }

}
