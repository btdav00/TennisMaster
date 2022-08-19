import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () =>
      import('./pages/home/home.module').then((m) => m.HomePageModule),
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
    loadChildren: () => import('./pages/partite/partite.module').then( m => m.PartitePageModule)
  },
  {
    path: 'tabs',
    loadChildren: () => import('./pages/tabs/tabs.module').then( m => m.TabsPageModule)
  },
  {
    path: 'userprofile',
    loadChildren: () => import('./pages/userprofile/userprofile.module').then(m => m.UserprofilePageModule)
  },
  {
    path: 'clubprofile',
    loadChildren: () => import('./pages/clubprofile/clubprofile.module').then(m => m.ClubprofilePageModule)
  },
  {
    path: 'notifications',
    loadChildren: () => import('./pages/notifications/notifications.module').then(m => m.NotificationsPageModule)
  },
  {
    path: 'modprofile',
    loadChildren: () => import('./pages/modprofile/modprofile.module').then(m => m.ModprofilePageModule)
  },
  {
    path: 'mybookings',
    loadChildren: () => import('./pages/mybookings/mybookings.module').then( m => m.MybookingsPageModule)
  },
  {
    path: 'matchdetails',
    loadChildren: () => import('./pages/matchdetails/matchdetails.module').then( m => m.MatchdetailsPageModule)
  },
  {
    path: 'postsmatch',
    loadChildren: () => import('./pages/postsmatch/postsmatch.module').then( m => m.PostsmatchPageModule)
  },




];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
