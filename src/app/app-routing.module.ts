import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {RedirectIfNotLoggedGuard} from "./service/authorization/guard/ifnotlogged/redirect-if-not-logged.guard";
import {RedirectIfLoggedGuard} from "./service/authorization/guard/iflogged/redirect-if-logged.guard";



const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then((m) => m.HomePageModule),
    canActivate:[RedirectIfNotLoggedGuard]
  },

  {
    path: '',
    redirectTo: 'splash',
    pathMatch: 'full',
  },

  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then((m) => m.LoginPageModule),
    canActivate:[RedirectIfLoggedGuard]
  },
  {
    path: 'registration',
    loadChildren: () => import('./pages/registration/registration.module').then((m) => m.RegistrationPageModule),
    canActivate:[RedirectIfLoggedGuard]
  },
  {
    path: 'calendar',
    loadChildren: () => import('./pages/calendar/calendar.module').then( m => m.CalendarPageModule)
  },
  {
    path: 'partite',
    loadChildren: () => import('./pages/partite/partite.module').then( m => m.PartitePageModule),
    canActivate:[RedirectIfNotLoggedGuard]
  },
  {
    path: 'tabs',
    loadChildren: () => import('./pages/tabs/tabs.module').then( m => m.TabsPageModule),
    canActivate:[RedirectIfNotLoggedGuard]
  },
  {
    path: 'userprofile',
    loadChildren: () => import('./pages/userprofile/userprofile.module').then(m => m.UserprofilePageModule),
    canActivate:[RedirectIfNotLoggedGuard]
  },
  {
    path: 'clubprofile',
    loadChildren: () => import('./pages/clubprofile/clubprofile.module').then(m => m.ClubprofilePageModule),
    canActivate:[RedirectIfNotLoggedGuard]
  },
  {
    path: 'notifications',
    loadChildren: () => import('./pages/notifications/notifications.module').then(m => m.NotificationsPageModule),
    canActivate:[RedirectIfNotLoggedGuard]
  },
  {
    path: 'modprofile',
    loadChildren: () => import('./pages/modprofile/modprofile.module').then(m => m.ModprofilePageModule),
    canActivate:[RedirectIfNotLoggedGuard]
  },
  {
    path: 'mybookings',
    loadChildren: () => import('./pages/mybookings/mybookings.module').then( m => m.MybookingsPageModule),
    canActivate:[RedirectIfNotLoggedGuard]
  },
  {
    path: 'matchdetails',
    loadChildren: () => import('./pages/matchdetails/matchdetails.module').then( m => m.MatchdetailsPageModule),
    canActivate:[RedirectIfNotLoggedGuard]
  },
  {
    path: 'postsmatch',
    loadChildren: () => import('./pages/postsmatch/postsmatch.module').then( m => m.PostsmatchPageModule),
    canActivate:[RedirectIfNotLoggedGuard]
  },
  {
    path: 'newmatch',
    loadChildren: () => import('./pages/newmatch/newmatch.module').then( m => m.NewmatchPageModule),
    canActivate:[RedirectIfNotLoggedGuard]
  },
  {
    path: 'reviews',
    loadChildren: () => import('./pages/reviews/reviews.module').then(m => m.ReviewsPageModule),
    canActivate:[RedirectIfNotLoggedGuard]
  },
  {
    path: 'homesearch',
    loadChildren: () => import('./pages/search/homesearch/homesearch.module').then(m => m.HomesearchPageModule)
  },
  {
    path: 'searchplayer',
    loadChildren: () => import('./pages/search/searchplayer/searchplayer.module').then( m => m.SearchplayerPageModule)
  },
  {
    path: 'searchclub',
    loadChildren: () => import('./pages/search/searchclub/searchclub.module').then(m => m.SearchclubPageModule)
  },
  {
    path: 'payments',
    loadChildren: () => import('./pages/payments/payments.module').then(m => m.PaymentsPageModule)
  },
  {
    path: 'splash',
    loadChildren: () => import('./pages/splash/splash.module').then( m => m.SplashPageModule)
  },
  {
    path: 'homeclub',
    loadChildren: () => import('./pages/homeclub/homeclub.module').then( m => m.HomeClubPageModule)
  }




];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
