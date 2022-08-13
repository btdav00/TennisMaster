import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PostsmatchPage } from './postsmatch.page';

const routes: Routes = [
  {
    path: '',
    component: PostsmatchPage
  },
  {
    path: 'post',
    loadChildren: () => import('./post/post.module').then( m => m.PostPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PostsmatchPageRoutingModule {}
