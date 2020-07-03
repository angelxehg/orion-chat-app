import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WorkspaceDetailsPage } from './workspace-details.page';

const routes: Routes = [
  {
    path: '',
    component: WorkspaceDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WorkspaceDetailsPageRoutingModule {}
