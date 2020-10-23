import { Component, Input } from '@angular/core';
import { MenuItem } from 'src/app/models/menu';

@Component({
  selector: 'app-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.scss'],
})
export class MenuItemComponent {

  @Input() items: MenuItem[];

  constructor() { }

  isUrlActive(url) {
    return window.location.pathname.includes(url);
  }

}
