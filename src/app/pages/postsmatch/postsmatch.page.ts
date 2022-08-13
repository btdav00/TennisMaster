import {Component, OnInit, ViewChild} from '@angular/core';
import {IonContent} from "@ionic/angular";

@Component({
  selector: 'app-postsmatch',
  templateUrl: './postsmatch.page.html',
  styleUrls: ['./postsmatch.page.scss'],
})
export class PostsmatchPage implements OnInit {

  newMsg : String
  @ViewChild(IonContent) content: IonContent

  constructor() {
    this.newMsg=''
  }

  ngOnInit() {
  }

  sendPost(){
    this.newMsg=''
    setTimeout(()=>{
      this.content.scrollToBottom(200)
    });
  }

}
