import { Component, Input } from '@angular/core';
import { TomatoeItem } from 'src/app/models/item';

@Component({
  selector: 'app-car-item',
  templateUrl: './car-item.component.html',
  styleUrls: ['./car-item.component.scss'],
})
export class CarItemComponent {

  @Input() item: TomatoeItem = {
    title: 'Item',
  };

  constructor() { }

}
