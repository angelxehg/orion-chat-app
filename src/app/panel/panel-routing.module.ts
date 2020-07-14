import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PanelPage } from './panel.page';
import { OrganizationGuard } from '../guards/organization.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/app/home',
    pathMatch: 'full'
  },
  {
    path: '',
    component: PanelPage,
    canActivateChild: [OrganizationGuard],
    children: [
      {
        path: 'home',
        loadChildren: () => import('../pages/home/home.module').then(m => m.HomePageModule)
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
        path: 'settings',
        loadChildren: () => import('../pages/settings/settings.module').then(m => m.SettingsPageModule)
      },
      {
        path: '',
        redirectTo: '/app/home',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: 'workspaces',
    loadChildren: () => import('../pages/workspaces/workspaces.module').then(m => m.WorkspacesPageModule),
    canActivate: [OrganizationGuard],
  },
  {
    path: 'channels',
    loadChildren: () => import('../pages/channels/channels.module').then(m => m.ChannelsPageModule),
    canActivate: [OrganizationGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PanelPageRoutingModule { }
