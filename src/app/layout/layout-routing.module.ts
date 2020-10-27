import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutPage } from './layout.page';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/app/home',
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
        loadChildren: () => import('../pages/spaces/spaces.module').then(m => m.SpacesPageModule),
      },
      {
        path: 'contacts',
        loadChildren: () => import('../pages/contacts/contacts.module').then(m => m.ContactsPageModule)
      },
      {
        path: 'chats',
        loadChildren: () => import('../pages/chats/chats.module').then(m => m.ChatsPageModule)
      },
      {
        path: 'events',
        loadChildren: () => import('../pages/events/events.module').then(m => m.EventsPageModule)
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
        path: 'palette',
        loadChildren: () => import('../pages/dev-palette/dev-palette.module').then(m => m.DevPalettePageModule)
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
