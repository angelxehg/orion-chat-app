import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrganizationGuard } from '../guards/organization.guard';

import { LayoutPage } from './layout.page';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/app/chats',
    pathMatch: 'full'
  },
  {
    path: '',
    component: LayoutPage,
    // canActivateChild: [OrganizationGuard],
    children: [
      {
        path: 'home',
        loadChildren: () => import('../pages/home/home.module').then(m => m.HomePageModule)
      },
      {
        path: 'spaces',
        loadChildren: () => import('../pages/workspaces/workspaces.module').then(m => m.WorkspacesPageModule),
      },
      {
        path: 'chats',
        loadChildren: () => import('../pages/channels/channels.module').then(m => m.ChannelsPageModule),
      },
      {
        path: 'search',
        loadChildren: () => import('../pages/search/search.module').then(m => m.SearchPageModule)
      },
      {
        path: 'files',
        loadChildren: () => import('../pages/files/files.module').then(m => m.FilesPageModule)
      },
      {
        path: 'organization',
        loadChildren: () => import('../pages/organization/organization.module').then(m => m.OrganizationPageModule)
      },
      {
        path: 'profile',
        loadChildren: () => import('../pages/profile/profile.module').then(m => m.ProfilePageModule)
      },
      {
        path: 'more',
        loadChildren: () => import('../pages/more/more.module').then(m => m.MorePageModule)
      },
      {
        path: 'settings',
        loadChildren: () => import('../pages/settings/settings.module').then(m => m.SettingsPageModule)
      },
      {
        path: '',
        redirectTo: '/app/home',
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
