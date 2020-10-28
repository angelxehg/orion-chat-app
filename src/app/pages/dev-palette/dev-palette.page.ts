import { Component } from '@angular/core';
import { TomatoeItem } from 'src/app/models/item';

@Component({
  selector: 'app-dev-palette',
  templateUrl: './dev-palette.page.html',
  styleUrls: ['./dev-palette.page.scss'],
})
export class DevPalettePage {

  colors = ['primary', 'secondary', 'tertiary', 'success', 'warning', 'danger'];

  setA: TomatoeItem[] = this.colors.map(color => {
    return {
      title: color,
      icon: { name: 'color-palette', color }
    };
  });

  setB: TomatoeItem[] = this.colors.map(color => {
    return {
      title: color,
      color,
      icon: { name: 'color-palette' }
    };
  });

  constructor() { }

}
