import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'friend-create',
    loadChildren: () => import('./friend-create/friend-create.module').then(m => m.FriendCreatePageModule)
  },
  {
    path: 'friend-update/:id',
    loadChildren: () => import('./friend-update/friend-update.module').then(m => m.FriendUpdatePageModule)
  }

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
