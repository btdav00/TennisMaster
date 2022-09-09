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
import {MatchService} from "../../service/manageObject/match/match.service";

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

  constructor(private router : Router , private input : MyinputService,private persistent:PersistentMenagerService,private auth:AuthorizationService , public matchService: MatchService) {}

  ngOnInit() {
    // @ts-ignore
    this.match=this.input.getInput().match
    // @ts-ignore
    this.club=this.input.getInput().club

    this.persistent.searchComment(null,this.match.id,null,['time'],[true]).subscribe(
      (obj)=>{
        this.msgs=this.persistent.eval(Comment.name,obj)
        setTimeout(()=>{
          this.content.scrollToBottom(100)
        },200);
      }
    )
  }

  goToMatchDetail(){

    this.input.addInput({
      match : this.match,
      club : this.club,
    })
    this.router.navigate(['matchdetails'])
  }



  sendPost(){
    //create
    let post=new Comment()
    post.text=this.newMsg
    post.time=new Date()

   this.persistent.addComment(post,this.match,this.auth.getCurrentUId())
    //reset
    this.newMsg=''
  }

}
