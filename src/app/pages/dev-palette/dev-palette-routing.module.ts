import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DevPalettePage } from './dev-palette.page';

const routes: Routes = [
  {
    path: '',
    component: DevPalettePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DevPalettePageRoutingModule {}
