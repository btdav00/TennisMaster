import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SelectgeneralPage } from './selectgeneral.page';

const routes: Routes = [
  {
    path: '',
    component: SelectgeneralPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SelectgeneralPageRoutingModule {}
