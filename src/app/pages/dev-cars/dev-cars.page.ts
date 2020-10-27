import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { TomatoeItem } from 'src/app/models/item';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-dev-cars',
  templateUrl: './dev-cars.page.html',
  styleUrls: ['./dev-cars.page.scss'],
})
export class DevCarsPage {

  // Recibe el listado de autos desde Firebase. Como es Observable se actualiza automáticamente
  items: Observable<TomatoeItem[]> = this.cars.items;

  // Se tiene que injectar el servicio en el constructor
  constructor(private cars: CarService) { }

  enabled = () => this.cars.enabled();

}
