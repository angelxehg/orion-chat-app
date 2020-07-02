import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/app/workspace',
    pathMatch: 'full'
  },
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'workspace',
        loadChildren: () => import('../panel/workspace/workspace.module').then(m => m.WorkspacePageModule)
      },
      {
        path: 'channels',
        loadChildren: () => import('../panel/channels/channels.module').then(m => m.ChannelsPageModule)
      },
      {
        path: 'search',
        loadChildren: () => import('../panel/search/search.module').then(m => m.SearchPageModule)
      },
      {
        path: 'settings',
        loadChildren: () => import('../panel/settings/settings.module').then(m => m.SettingsPageModule)
      },
      {
        path: '',
        redirectTo: '/app/workspace',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule { }
