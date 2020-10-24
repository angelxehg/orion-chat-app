import { Component, Input } from '@angular/core';
import { TomatoeItem } from 'src/app/models/item';

@Component({
  selector: 'app-button-grid',
  templateUrl: './button-grid.component.html',
  styleUrls: ['./button-grid.component.scss'],
})
export class ButtonGridComponent {

  @Input() items: TomatoeItem[] = [];

  constructor() { }

}
