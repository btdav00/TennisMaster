import {Component, Input, OnInit} from '@angular/core';
import {Comment} from "../../../model/Comment";

@Component({
  selector: 'app-post',
  templateUrl: './post.page.html',
  styleUrls: ['./post.page.scss'],
})
export class PostPage implements OnInit {

  @Input() post : Comment



  constructor() { }

  ngOnInit() {
  }

  stringDate(date : Date ){

    date= new Date(date.toISOString());
    let  day= <unknown>date.getUTCDate()
    let month= <unknown>(date.getMonth()+1)
    let year= <unknown>date.getFullYear()
    let hours=date.getUTCHours()
    let minutes=date.getUTCMinutes()
    let seconds=date.getUTCSeconds()
    if(day<10){
      day= "0"+day
    }
    if(month<10){
      month= "0"+month
    }
    return day+"/"+month+"/"+year+"  "+hours+":"+minutes+":"+seconds;
  }

}
