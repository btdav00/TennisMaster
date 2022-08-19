import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SelectsetPage } from './selectset.page';

const routes: Routes = [
  {
    path: '',
    component: SelectsetPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SelectsetPageRoutingModule {}
