import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TabsPage } from './tabs.page';
/*
import { canActivate, redirectLoggedInTo, redirectUnauthorizedTo} from '@angular/fire/compat/auth-guard';


const redirectUnauthorizedToLogin = () =>
  redirectUnauthorizedTo(['/login']);

const redirectLoggedInToHome = () =>
  redirectLoggedInTo(['/tabs']);
*/

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'home',
        loadChildren: () => import('../home/home.module').then(m => m.HomePageModule)
      },
      {
        path: 'homeclub',
        loadChildren: () => import('../homeclub/homeclub.module').then(m => m.HomeClubPageModule)
      },
      {
        path: 'userprofile',
        loadChildren: () => import('../userprofile/userprofile.module').then(m => m.UserprofilePageModule),
        //...canActivate(redirectUnauthorizedToLogin)
      },

    ]
  },
  {
    path: '',
    redirectTo: 'tabs/home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    redirectTo: 'tabs/home',
    pathMatch: 'full'
  },
  {
    path: 'homeclub',
    redirectTo: 'tabs/homeclub',
    pathMatch: 'full'
  },
  {
    path: 'userprofile',
    redirectTo: 'tabs/userprofile',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
