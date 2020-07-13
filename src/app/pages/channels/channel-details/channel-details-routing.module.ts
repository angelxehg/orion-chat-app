import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChannelDetailsPage } from './channel-details.page';

const routes: Routes = [
  {
    path: '',
    component: ChannelDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChannelDetailsPageRoutingModule {}
