import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FriendCreatePage } from './friend-create.page';

const routes: Routes = [
  {
    path: '',
    component: FriendCreatePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FriendCreatePageRoutingModule {}
