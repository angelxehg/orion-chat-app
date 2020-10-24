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
      title: 'Contactos',
      url: '/app/contacts',
      icon: 'people',
    },
    {
      title: 'Eventos',
      url: '/app/events',
      icon: 'calendar',
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
  ];

  constructor() { }

  activeColor(url) {
    const active = window.location.pathname.includes(url);
    return active ? 'primary' : '';
  }

}
