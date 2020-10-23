import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PanelPage } from './panel.page';
import { OrganizationGuard } from '../guards/organization.guard';

const routes: Routes = [
  {
    path: '',
    component: PanelPage
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PanelPageRoutingModule { }
