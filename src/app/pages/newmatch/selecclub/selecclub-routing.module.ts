import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SelecclubPage } from './selecclub.page';

const routes: Routes = [
  {
    path: '',
    component: SelecclubPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SelecclubPageRoutingModule {}
