import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WorkspacesPage } from './workspaces.page';

const routes: Routes = [
  {
    path: '',
    component: WorkspacesPage,
    children: [
      {
        path: '',
        loadChildren: () => import('./workspace-default/workspace-default.module').then(m => m.WorkspaceDefaultPageModule)
      },
      {
        path: ':workspace',
        loadChildren: () => import('./workspace-details/workspace-details.module').then(m => m.WorkspaceDetailsPageModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WorkspacesPageRoutingModule { }
