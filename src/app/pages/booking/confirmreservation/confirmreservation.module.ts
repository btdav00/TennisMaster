import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConfirmreservationPageRoutingModule } from './confirmreservation-routing.module';

import { ConfirmreservationPage } from './confirmreservation.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConfirmreservationPageRoutingModule
  ],
  declarations: [ConfirmreservationPage]
})
export class ConfirmreservationPageModule {}
