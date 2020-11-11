import { Component, } from '@angular/core';
import { MenuItem } from 'src/app/models/menu';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent {

  items: MenuItem[] = [
    {
      title: 'Chats',
      url: '/app/chats',
      icon: 'chatbubbles',
    },
    {
      title: 'Contactos',
      url: '/app/contacts',
      icon: 'people',
    },
    {
      title: 'Configuración',
      url: '/app/settings',
      icon: 'cog',
    },
  ];

  constructor() { }

  activeIcon(item: MenuItem) {
    if (window.location.pathname.includes(item.url)) {
      return item.icon;
    }
    return `${item.icon}-outline`;
  }

  activeColor(url) {
    const active = window.location.pathname.includes(url);
    return active ? 'primary' : '';
  }

}
