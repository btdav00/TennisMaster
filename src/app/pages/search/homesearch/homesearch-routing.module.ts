import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomesearchPage } from './homesearch.page';

const routes: Routes = [
  {
    path: '',
    component: HomesearchPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomesearchPageRoutingModule {}
