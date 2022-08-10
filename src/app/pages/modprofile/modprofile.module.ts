import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModprofilePageRoutingModule } from './modprofile-routing.module';

import { ModprofilePage } from './modprofile.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModprofilePageRoutingModule
  ],
  declarations: [ModprofilePage]
})
export class ModprofilePageModule {}
