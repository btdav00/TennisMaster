import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MybookingsPageRoutingModule } from './mybookings-routing.module';

import { MybookingsPage } from './mybookings.page';
import {MybookingPageModule} from "./mybooking/mybooking.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MybookingsPageRoutingModule,
    MybookingPageModule
  ],
  exports: [
    MybookingsPage
  ],
  declarations: [MybookingsPage]
})
export class MybookingsPageModule {}
