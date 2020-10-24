import { Component } from '@angular/core';
import { TomatoeItem } from 'src/app/models/item';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {

  colors: TomatoeItem[] = [
    'primary', 'secondary', 'tertiary', 'success', 'warning', 'danger', 'dark', 'medium', 'light'
  ].map(color => {
    return {
      title: `Color '${color}'`,
      icon: 'color-palette-outline',
      color
    };
  });

  constructor() { }

}
