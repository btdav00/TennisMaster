import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PartitePage } from './partite.page';

const routes: Routes = [
  {
    path: '',
    component: PartitePage
  },
  {
    path: 'match',
    loadChildren: () => import('./match/match.module').then( m => m.MatchPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PartitePageRoutingModule {}
