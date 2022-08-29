import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SearchplayerPage } from './searchplayer.page';

const routes: Routes = [
  {
    path: '',
    component: SearchplayerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SearchplayerPageRoutingModule {}
