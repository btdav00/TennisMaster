import {Component, enableProdMode} from '@angular/core';
import {Router} from "@angular/router";
import {Platform} from "@ionic/angular";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(public router: Router,private platform : Platform ) {
    this.inizializeApp()
  }

  inizializeApp(){
    enableProdMode()
    this.platform.ready().then(()=>{
    })
  }
}
