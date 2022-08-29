import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SearchclubPageRoutingModule } from './searchclub-routing.module';

import { SearchclubPage } from './searchclub.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SearchclubPageRoutingModule
  ],
  exports: [
    SearchclubPage
  ],
  declarations: [SearchclubPage]
})
export class SearchclubPageModule {}
