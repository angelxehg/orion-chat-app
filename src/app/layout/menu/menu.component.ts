import { Component } from '@angular/core';
import { MenuGroup } from 'src/app/models/menu';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent {

  public menuGroups: MenuGroup[] = [
    {
      title: 'Secciones',
      items: [
        {
          title: 'Inicio',
          url: '/app/home',
          icon: 'home',
        },
        {
          title: 'Chats',
          url: '/app/chats',
          icon: 'chatbubbles',
        },
        {
          title: 'Espacios',
          url: '/app/spaces',
          icon: 'file-tray-full',
        },
        {
          title: 'Archivos',
          url: '/app/files',
          icon: 'documents',
        },
        {
          title: 'Configuración',
          url: '/app/settings',
          icon: 'cog',
        },
      ]
    }
  ];

  constructor() { }

  isUrlActive(url) {
    return window.location.pathname.includes(url);
  }

}
