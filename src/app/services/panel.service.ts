import { Injectable } from '@angular/core';
import { of, Subject } from 'rxjs';
import { MenuGroup } from '../models/menu';

export const PanelServiceMock = {
  title: () => 'Page',
  show: (panel: string = 'menu', tabs: boolean = true) => { },
  hide: () => { },
  panel: false,
  tabs: false,
  current: '',
  menuItems: of([])
};

@Injectable({
  providedIn: 'root'
})
export class PanelService {

  public panel: boolean;
  public tabs: boolean;

  public current: string;

  private defaultMenu: MenuGroup[] = [
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

  private defaultChats: MenuGroup[] = [
    {
      title: 'Conversaciones',
      items: [
        {
          title: 'Conversación 1',
          url: '/app/chats/1',
          icon: 'home',
        },
        {
          title: 'Conversación 2',
          url: '/app/chats/2',
          icon: 'home',
        },
        {
          title: 'Conversación 3',
          url: '/app/chats/3',
          icon: 'home',
        },
      ]
    }
  ];

  private items: MenuGroup[] = [];
  private items$ = new Subject<MenuGroup[]>();

  public menuItems = this.items$.asObservable();

  constructor() {
    this.show();
    this.items = this.defaultMenu;
    this.items$.next(this.items);
  }

  title() {
    switch (this.current) {
      case 'chats':
        return 'Conversaciones';
      default:
        return 'Tomatoe Chat';
    }
  }

  show(panel: string = 'menu', tabs: boolean = true) {
    this.panel = true;
    this.current = panel;
    this.tabs = tabs;
    switch (this.current) {
      case 'chats':
        this.items = this.defaultChats;
        break;
      default:
        this.items = this.defaultMenu;
        break;
    }
    this.items$.next(this.items);
  }

  hide() {
    this.panel = false;
    this.tabs = false;
  }
}
