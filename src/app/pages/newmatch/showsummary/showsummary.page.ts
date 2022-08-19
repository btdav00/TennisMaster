import {Component, Input, OnInit} from '@angular/core';
import {Match} from "../../../model/Match";
import {Club} from "../../../model/Club";
import {Router} from "@angular/router";

@Component({
  selector: 'app-showsummary',
  templateUrl: './showsummary.page.html',
  styleUrls: ['./showsummary.page.scss'],
})
export class ShowsummaryPage implements OnInit {

  @Input() match : Match
  @Input() club : Club
  public allertMessage : String

  constructor(private router : Router) { }

  ngOnInit() {
    this.allertMessage="Non selezionato"
  }

  dateToString():String{


    let  day= <unknown>this.match.date.getUTCDate()
    let month= <unknown>(this.match.date.getMonth()+1)
    let year= <unknown>this.match.date.getFullYear()
    if(day<10){
      day= "0"+day
    }
    if(month<10){
      month= "0"+month
    }
    return day+"/"+month+"/"+this.match.date.getFullYear();
  }

  validation(){
    let result=true;
    if(this.club==null)result=false;
    if(this.match.date==null)result=false;
    if(this.match.sets.length!=3)result=false;
    if(this.match.type!='doppio' && this.match.type!='singolo')result=false;
    if(this.match.type=='doppio' && (this.match.player1.length!=2||this.match.player2.length!=2))result=false;
    if(this.match.type=='singolo' && (this.match.player1.length!=1||this.match.player2.length!=1))result=false;
    return result
  }

  submit(){
    this.router.navigate(['tabs'])
  }

}
