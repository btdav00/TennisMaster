import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewmatchPage } from './newmatch.page';

const routes: Routes = [
  {
    path: '',
    component: NewmatchPage
  },
  {
    path: 'selectplayer',
    loadChildren: () => import('./selectplayer/selectplayer.module').then( m => m.SelectplayerPageModule)
  },
  {
    path: 'selecclub',
    loadChildren: () => import('./selecclub/selecclub.module').then( m => m.SelecclubPageModule)
  },
  {
    path: 'selectgeneral',
    loadChildren: () => import('./selectgeneral/selectgeneral.module').then( m => m.SelectgeneralPageModule)
  },
  {
    path: 'selectset',
    loadChildren: () => import('./selectset/selectset.module').then( m => m.SelectsetPageModule)
  },
  {
    path: 'showsummary',
    loadChildren: () => import('./showsummary/showsummary.module').then( m => m.ShowsummaryPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewmatchPageRoutingModule {}
