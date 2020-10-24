import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LandingPage } from './landing.page';
import { VerifyComponent } from './verify/verify.component';

const routes: Routes = [
  {
    path: '',
    component: LandingPage
  },
  {
    path: 'verify',
    component: VerifyComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LandingPageRoutingModule { }
