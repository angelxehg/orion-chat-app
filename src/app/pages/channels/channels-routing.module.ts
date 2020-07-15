import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChannelsPage } from './channels.page';

const routes: Routes = [
  {
    path: '',
    component: ChannelsPage,
  },
  {
    path: 'new',
    loadChildren: () => import('./channel-details/channel-details.module').then(m => m.ChannelDetailsPageModule)
  },
  {
    path: ':channel',
    loadChildren: () => import('./channel-details/channel-details.module').then(m => m.ChannelDetailsPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChannelsPageRoutingModule { }
