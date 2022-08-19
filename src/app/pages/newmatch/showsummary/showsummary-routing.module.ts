import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShowsummaryPage } from './showsummary.page';

const routes: Routes = [
  {
    path: '',
    component: ShowsummaryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShowsummaryPageRoutingModule {}
