import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrganizationPage } from './organization.page';

const routes: Routes = [
  {
    path: '',
    component: OrganizationPage
  },
  {
    path: 'new',
    loadChildren: () => import('./organization-details/organization-details.module').then(m => m.OrganizationDetailsPageModule)
  },
  {
    path: ':organization',
    loadChildren: () => import('./organization-details/organization-details.module').then(m => m.OrganizationDetailsPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrganizationPageRoutingModule { }
