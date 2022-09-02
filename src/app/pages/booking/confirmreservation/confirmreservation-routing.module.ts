import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConfirmreservationPage } from './confirmreservation.page';

const routes: Routes = [
  {
    path: '',
    component: ConfirmreservationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConfirmreservationPageRoutingModule {}
