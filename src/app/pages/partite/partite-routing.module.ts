import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PartitePage } from './partite.page';

const routes: Routes = [
  {
    path: '',
    component: PartitePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PartitePageRoutingModule {}
