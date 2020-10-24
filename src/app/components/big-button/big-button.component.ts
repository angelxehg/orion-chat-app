import { Component, Input } from '@angular/core';
import { TomatoeItem } from 'src/app/models/item';

@Component({
  selector: 'app-big-button',
  templateUrl: './big-button.component.html',
  styleUrls: ['./big-button.component.scss'],
})
export class BigButtonComponent {

  @Input() item: TomatoeItem = {
    title: 'Sample Item'
  };

  constructor() { }

}
