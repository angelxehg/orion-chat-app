import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { canActivate, redirectLoggedInTo, redirectUnauthorizedTo } from '@angular/fire/auth-guard';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['landing']);
const redirectLoggedInToApp = () => redirectLoggedInTo(['app']);

const routes: Routes = [
  {
    path: '',
    redirectTo: 'app',
    pathMatch: 'full'
  },
  {
    path: 'app',
    loadChildren: () => import('./layout/layout.module').then(m => m.LayoutPageModule),
    ...canActivate(redirectUnauthorizedToLogin)
  },
  {
    path: 'landing',
    loadChildren: () => import('./pages/landing/landing.module').then(m => m.LandingPageModule),
    ...canActivate(redirectLoggedInToApp)
  },
  {
    path: 'verify',
    loadChildren: () => import('./pages/verify/verify.module').then(m => m.VerifyPageModule)
  }

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
