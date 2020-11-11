import { Component, } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent {

  constructor() { }

  activeIcon(url: string, icon: string) {
    if (window.location.pathname.includes(url)) {
      return icon;
    }
    return `${icon}-outline`;
  }

  activeColor(url) {
    const active = window.location.pathname.includes(url);
    return active ? 'primary' : '';
  }

}
