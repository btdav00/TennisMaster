import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SearchplayerPageRoutingModule } from './searchplayer-routing.module';

import { SearchplayerPage } from './searchplayer.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SearchplayerPageRoutingModule
  ],
  exports: [
    SearchplayerPage
  ],
  declarations: [SearchplayerPage]
})
export class SearchplayerPageModule {}
