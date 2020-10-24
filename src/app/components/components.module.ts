import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { BigButtonComponent } from './big-button/big-button.component';

@NgModule({
  declarations: [
    BigButtonComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [
    BigButtonComponent
  ]
})
export class ComponentsModule { }
