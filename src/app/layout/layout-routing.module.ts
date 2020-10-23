import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutPage } from './layout.page';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: '',
    component: LayoutPage,
    children: [
      {
        path: 'home',
        loadChildren: () => import('../pages/home/home.module').then(m => m.HomePageModule)
      },
      {
        path: 'spaces',
        loadChildren: () => import('../pages/spaces/spaces.module').then(m => m.SpacesPageModule)
      },
      {
        path: 'chats',
        loadChildren: () => import('../pages/channels/channels.module').then(m => m.ChannelsPageModule),
      },
      {
        path: 'files',
        loadChildren: () => import('../pages/files/files.module').then(m => m.FilesPageModule)
      },
      {
        path: 'settings',
        loadChildren: () => import('../pages/settings/settings.module').then(m => m.SettingsPageModule)
      },
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LayoutPageRoutingModule { }
