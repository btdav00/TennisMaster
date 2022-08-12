import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MybookingPage } from './mybooking.page';

const routes: Routes = [
  {
    path: '',
    component: MybookingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MybookingPageRoutingModule {}
