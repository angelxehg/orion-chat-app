import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FriendUpdatePage } from './friend-update.page';

const routes: Routes = [
  {
    path: '',
    component: FriendUpdatePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FriendUpdatePageRoutingModule {}
