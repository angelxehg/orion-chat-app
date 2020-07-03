import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChannelDefaultPage } from './channel-default.page';

const routes: Routes = [
  {
    path: '',
    component: ChannelDefaultPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChannelDefaultPageRoutingModule {}
