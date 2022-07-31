import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClubprofilePageRoutingModule } from './clubprofile-routing.module';

import { ClubprofilePage } from './clubprofile.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ClubprofilePageRoutingModule
  ],
  declarations: [ClubprofilePage]
})
export class ClubprofilePageModule {}
