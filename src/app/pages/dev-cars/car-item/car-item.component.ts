import { Component, Input } from '@angular/core';
import { TomatoeItem } from 'src/app/models/item';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-car-item',
  templateUrl: './car-item.component.html',
  styleUrls: ['./car-item.component.scss'],
})
export class CarItemComponent {

  @Input() item: TomatoeItem = {
    title: 'Item',
  };

  constructor(private cars: CarService) { }

  delete() {
    this.cars.delete(this.item.id).then();
  }

}
