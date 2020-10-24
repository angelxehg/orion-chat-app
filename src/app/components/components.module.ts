import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { BigButtonComponent } from './big-button/big-button.component';
import { ButtonGridComponent } from './button-grid/button-grid.component';

@NgModule({
  declarations: [
    BigButtonComponent,
    ButtonGridComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [
    BigButtonComponent,
    ButtonGridComponent
  ]
})
export class ComponentsModule { }
