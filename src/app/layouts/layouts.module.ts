import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { HybridLayoutComponent } from './hybrid-layout/hybrid-layout.component';

@NgModule({
  declarations: [
    HybridLayoutComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [
    HybridLayoutComponent
  ]
})
export class LayoutsModule { }
