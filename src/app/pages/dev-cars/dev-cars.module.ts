import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DevCarsPageRoutingModule } from './dev-cars-routing.module';

import { DevCarsPage } from './dev-cars.page';
import { CarListComponent } from './car-list/car-list.component';
import { CarItemComponent } from './car-item/car-item.component';
import { CarDetailsComponent } from './car-details/car-details.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DevCarsPageRoutingModule
  ],
  declarations: [
    DevCarsPage,
    // Se debe declarar el componente CarList, CarItem para poderlo usar
    CarListComponent,
    CarItemComponent,
    CarDetailsComponent
  ]
})
export class DevCarsPageModule { }
