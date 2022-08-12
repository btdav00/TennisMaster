import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MybookingsPage } from './mybookings.page';

const routes: Routes = [
  {
    path: '',
    component: MybookingsPage
  },
  {
    path: 'mybooking',
    loadChildren: () => import('./mybooking/mybooking.module').then( m => m.MybookingPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MybookingsPageRoutingModule {}
