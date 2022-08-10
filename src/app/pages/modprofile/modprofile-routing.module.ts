import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModprofilePage } from './modprofile.page';

const routes: Routes = [
  {
    path: '',
    component: ModprofilePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModprofilePageRoutingModule {}
