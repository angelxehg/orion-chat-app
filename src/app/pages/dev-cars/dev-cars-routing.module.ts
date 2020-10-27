import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CarDetailsComponent } from './car-details/car-details.component';

import { DevCarsPage } from './dev-cars.page';

const routes: Routes = [
  {
    path: '',
    component: DevCarsPage
  },
  // Esta ruta se usa para crear objetos. Carga el componente CarDetails
  {
    path: 'new',
    component: CarDetailsComponent
  },
  // Esta ruta se usa para ver o editar objetos. Carga el componente CarDetails. Recibe el id del documento
  {
    path: ':car',
    component: CarDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DevCarsPageRoutingModule { }
