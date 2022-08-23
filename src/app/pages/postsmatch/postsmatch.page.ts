import {Component, OnInit, ViewChild} from '@angular/core';
import {IonContent} from "@ionic/angular";
import {Comment} from "../../model/Comment";
import {User} from "../../model/User";
import {Match} from "../../model/Match";
import {MyInput} from "../../service/input";
import {Club} from "../../model/Club";
import {Place} from "../../model/Place";
import {Router} from "@angular/router";

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

  constructor(private router : Router) {

  }

  ngOnInit() {
    this.newMsg=''
    this.msgs=[]
    for (let i = 0; i <10; i++) {
      let c1=new Comment()
      let u1=new User()
      u1.name="Roberto"
      u1.surname="Di Stefano"
      c1.text="testo bello ..."
      c1.writer=u1
      c1.time=new Date()
      this.msgs.push(c1)
    }
    // @ts-ignore
    this.match=MyInput.getInput().match
    // @ts-ignore
    this.club=MyInput.getInput().club
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
    if(this.club==null)console.log('mannaggiaaaaaaaaa')

    MyInput.addInput({
      match : this.match,
      club : this.club
    })
    this.router.navigate(['matchdetails'])
  }



  sendPost(){
    //create
    let user=new User()
    user.name="Roberto"
    user.surname="Di Stefano"
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
