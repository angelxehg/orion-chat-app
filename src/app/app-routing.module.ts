import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: 'app',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'register',
    loadChildren: () => import('./auth/register/register.module').then(m => m.RegisterPageModule),
    canLoad: [AuthGuard]
  },
  {
    path: '',
    loadChildren: () => import('./auth/login/login.module').then(m => m.LoginPageModule),
    canLoad: [AuthGuard]
  },
  {
    path: 'panel',
    loadChildren: () => import('./panel/panel.module').then( m => m.PanelPageModule)
  },

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
