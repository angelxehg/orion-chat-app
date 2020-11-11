import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { canActivate, redirectLoggedInTo, redirectUnauthorizedTo } from '@angular/fire/auth-guard';
import { HybridLayoutComponent } from './layouts/hybrid-layout/hybrid-layout.component';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);
const redirectLoggedInToApp = () => redirectLoggedInTo(['app']);

const routes: Routes = [
  {
    path: '',
    redirectTo: 'app',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule),
    ...canActivate(redirectLoggedInToApp)
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then(m => m.RegisterPageModule),
    ...canActivate(redirectLoggedInToApp)
  },
  {
    path: 'recover',
    loadChildren: () => import('./pages/recover/recover.module').then(m => m.RecoverPageModule)
  },
  {
    path: 'verify',
    loadChildren: () => import('./pages/verify/verify.module').then(m => m.VerifyPageModule)
  },
  {
    path: 'app',
    component: HybridLayoutComponent,
    ...canActivate(redirectUnauthorizedToLogin),
    children: [
      {
        path: '',
        redirectTo: '/app/contacts',
        pathMatch: 'full'
      },
      {
        path: 'chats',
        loadChildren: () => import('./pages/chats/chats.module').then(m => m.ChatsPageModule)
      },
      {
        path: 'contacts',
        loadChildren: () => import('./pages/contacts/contacts.module').then(m => m.ContactsPageModule)
      },
      {
        path: 'settings',
        loadChildren: () => import('./pages/settings/settings.module').then(m => m.SettingsPageModule)
      }
    ]
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
