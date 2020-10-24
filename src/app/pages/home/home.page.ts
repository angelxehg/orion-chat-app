import { Component } from '@angular/core';
import { TomatoeItem } from 'src/app/models/item';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {

  pages: TomatoeItem[] = [
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

  // colors: TomatoeItem[] = [
  //   'primary', 'secondary', 'tertiary', 'success', 'warning', 'danger', 'dark', 'medium', 'light'
  // ].map(color => {
  //   return {
  //     title: `Color '${color}'`,
  //     icon: 'color-palette-outline',
  //     color
  //   };
  // });

  constructor() { }

}
