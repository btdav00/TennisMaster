import {Component, Input, OnInit} from '@angular/core';
import {Comment} from "../../../model/Comment";
import {AuthorizationService} from "../../../service/authorization/authorization.service";
import {DateService} from "../../../service/manageObject/date/date.service";

@Component({
  selector: 'app-post',
  templateUrl: './post.page.html',
  styleUrls: ['./post.page.scss'],
})
export class PostPage implements OnInit {

  @Input() post : Comment



  constructor(public auth:AuthorizationService,public dateService:DateService) { }

  ngOnInit() {
  }

  stringDate(date : Date ){
    date= new Date(date.toISOString());
    return this.dateService.getStringDate(date)+"  "+this.dateService.getStringTime(date,2);
  }

}
