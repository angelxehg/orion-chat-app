import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WorkspaceDefaultPage } from './workspace-default.page';

const routes: Routes = [
  {
    path: '',
    component: WorkspaceDefaultPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WorkspaceDefaultPageRoutingModule { }
