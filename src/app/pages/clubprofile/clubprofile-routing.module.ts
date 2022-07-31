import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClubprofilePage } from './clubprofile.page';

const routes: Routes = [
  {
    path: '',
    component: ClubprofilePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClubprofilePageRoutingModule {}
