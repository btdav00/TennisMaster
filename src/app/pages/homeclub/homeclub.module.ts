import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomeClubPageRoutingModule } from './homeclub-routing.module';

import { HomeclubPage } from './homeclub.page';
import {ClubprofilePageModule} from "../clubprofile/clubprofile.module";
import {ReservationsPageModule} from "../booking/reservations/reservations.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomeClubPageRoutingModule,
    ClubprofilePageModule,
    ReservationsPageModule
  ],
  declarations: [HomeclubPage]
})
export class HomeClubPageModule {}
