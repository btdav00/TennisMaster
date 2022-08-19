import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddmatchPage } from './addmatch.page';

const routes: Routes = [
  {
    path: '',
    component: AddmatchPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddmatchPageRoutingModule {}
