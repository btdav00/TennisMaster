import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SelectplayerPage } from './selectplayer.page';

const routes: Routes = [
  {
    path: '',
    component: SelectplayerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SelectplayerPageRoutingModule {}
