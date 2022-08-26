import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


import { AngularFireModule } from '@angular/fire/compat';
import { environment } from '../environments/environment';
import {AngularFirestore, AngularFirestoreModule} from '@angular/fire/compat/firestore';
import { AngularFireAuthModule} from '@angular/fire/compat/auth';
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {HttpClientModule} from "@angular/common/http";
import {AuthGuard} from "@angular/fire/auth-guard";

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,
    HttpClientModule
    ],
  providers: [AngularFirestore,{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },AuthGuard],
  bootstrap: [AppComponent],
})
export class AppModule {}
