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
      icon: {
        name: 'chatbubbles',
        color: 'primary'
      }
    },
    {
      title: 'Contactos',
      url: '/app/contacts',
      icon: {
        name: 'people',
        color: 'primary'
      }
    },
    {
      title: 'Espacios',
      url: '/app/spaces',
      icon: {
        name: 'file-tray-full',
        color: 'primary'
      }
    },
    {
      title: 'Configuración',
      url: '/app/settings',
      icon: {
        name: 'cog',
        color: 'primary'
      }
    },
  ];

  constructor() { }

}
