import { Component, Input } from '@angular/core';
import { TomatoeItem } from 'src/app/models/item';

@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.scss'],
})
export class CarListComponent {

  @Input() items: TomatoeItem[] = [];

  constructor() { }

}
