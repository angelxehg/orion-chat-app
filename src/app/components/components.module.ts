import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { BigButtonComponent } from './big-button/big-button.component';
import { ButtonGridComponent } from './button-grid/button-grid.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    BigButtonComponent,
    ButtonGridComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    IonicModule
  ],
  exports: [
    BigButtonComponent,
    ButtonGridComponent
  ]
})
export class ComponentsModule { }
