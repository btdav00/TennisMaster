import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomesearchPageRoutingModule } from './homesearch-routing.module';

import { HomesearchPage } from './homesearch.page';
import {SearchplayerPageModule} from "../searchplayer/searchplayer.module";
import {SearchclubPageModule} from "../searchclub/searchclub.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomesearchPageRoutingModule,
    SearchplayerPageModule,
    SearchclubPageModule
  ],
  declarations: [HomesearchPage]
})
export class HomesearchPageModule {}
