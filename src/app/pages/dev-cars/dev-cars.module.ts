import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DevCarsPageRoutingModule } from './dev-cars-routing.module';

import { DevCarsPage } from './dev-cars.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DevCarsPageRoutingModule
  ],
  declarations: [DevCarsPage]
})
export class DevCarsPageModule {}
