import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'app',
    loadChildren: () => import('./layout/layout.module').then(m => m.LayoutPageModule),
    // canActivate: [AuthGuard],
  },
  {
    path: 'login',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthPageModule)
  },
  // {
  //   path: 'app',
  //   loadChildren: () => import('./panel/panel.module').then(m => m.PanelPageModule),
  //   canActivate: [AuthGuard]
  // },
  // {
  //   path: 'register',
  //   loadChildren: () => import('./pages/auth/register/register.module').then(m => m.RegisterPageModule),
  //   canLoad: [AuthGuard]
  // },
  // {
  //   path: 'login',
  //   loadChildren: () => import('./pages/auth/login/login.module').then(m => m.LoginPageModule),
  //   canLoad: [AuthGuard]
  // },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
