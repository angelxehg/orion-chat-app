import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChannelsPage } from './channels.page';

const routes: Routes = [
  {
    path: '',
    component: ChannelsPage,
    children: [
      {
        path: '',
        loadChildren: () => import('./channel-default/channel-default.module').then(m => m.ChannelDefaultPageModule)
      },
      {
        path: ':channel',
        loadChildren: () => import('./channel-details/channel-details.module').then(m => m.ChannelDetailsPageModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChannelsPageRoutingModule { }
