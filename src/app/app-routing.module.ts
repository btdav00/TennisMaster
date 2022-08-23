import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {canActivate, redirectLoggedInTo, redirectUnauthorizedTo} from "@angular/fire/auth-guard";

const redirectAutorizedLogin = ()=>redirectUnauthorizedTo(['login'])
const redirectLoggedIn = ()=>redirectLoggedInTo(['tabs'])
const routes: Routes = [
  {
    path: 'home',
    loadChildren: () =>
      import('./pages/home/home.module').then((m) => m.HomePageModule),
    ...canActivate(redirectAutorizedLogin)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./pages/login/login.module').then((m) => m.LoginPageModule),
    ...canActivate(redirectLoggedIn)
  },
  {
    path: 'registration',
    loadChildren: () =>
      import('./pages/registration/registration.module').then(
        (m) => m.RegistrationPageModule
      ),
  },
  {
    path: 'calendar',
    loadChildren: () => import('./pages/calendar/calendar.module').then( m => m.CalendarPageModule)
  },
  {
    path: 'partite',
    loadChildren: () => import('./pages/partite/partite.module').then( m => m.PartitePageModule),
    ...canActivate(redirectAutorizedLogin)
  },
  {
    path: 'tabs',
    loadChildren: () => import('./pages/tabs/tabs.module').then( m => m.TabsPageModule),
    ...canActivate(redirectAutorizedLogin)
  },
  {
    path: 'userprofile',
    loadChildren: () => import('./pages/userprofile/userprofile.module').then(m => m.UserprofilePageModule),
    ...canActivate(redirectAutorizedLogin)
  },
  {
    path: 'clubprofile',
    loadChildren: () => import('./pages/clubprofile/clubprofile.module').then(m => m.ClubprofilePageModule),
    ...canActivate(redirectAutorizedLogin)
  },
  {
    path: 'notifications',
    loadChildren: () => import('./pages/notifications/notifications.module').then(m => m.NotificationsPageModule),
    ...canActivate(redirectAutorizedLogin)
  },
  {
    path: 'modprofile',
    loadChildren: () => import('./pages/modprofile/modprofile.module').then(m => m.ModprofilePageModule),
    ...canActivate(redirectAutorizedLogin)
  },
  {
    path: 'mybookings',
    loadChildren: () => import('./pages/mybookings/mybookings.module').then( m => m.MybookingsPageModule),
    ...canActivate(redirectAutorizedLogin)
  },
  {
    path: 'matchdetails',
    loadChildren: () => import('./pages/matchdetails/matchdetails.module').then( m => m.MatchdetailsPageModule),
    ...canActivate(redirectAutorizedLogin)
  },
  {
    path: 'postsmatch',
    loadChildren: () => import('./pages/postsmatch/postsmatch.module').then( m => m.PostsmatchPageModule),
    ...canActivate(redirectAutorizedLogin)
  },
  {
    path: 'newmatch',
    loadChildren: () => import('./pages/newmatch/newmatch.module').then( m => m.NewmatchPageModule),
    ...canActivate(redirectAutorizedLogin)
  },
  {
    path: 'search',
    loadChildren: () => import('./pages/search/search.module').then(m => m.SearchPageModule),
    ...canActivate(redirectAutorizedLogin)
  },




];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
