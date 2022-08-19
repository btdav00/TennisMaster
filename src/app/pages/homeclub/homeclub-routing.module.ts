import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeclubPage } from './homeclub.page';

const routes: Routes = [
  {
    path: '',
    component: HomeclubPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeClubPageRoutingModule {}
