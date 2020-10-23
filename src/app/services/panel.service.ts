import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { MenuGroup } from '../models/menu';

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

  private defaultSpaces: MenuGroup[] = [
    {
      title: 'Espacios',
      items: [
        {
          title: 'Espacio 1',
          url: '/app/spaces/1',
          icon: 'home',
        },
        {
          title: 'Espacio 2',
          url: '/app/spaces/2',
          icon: 'home',
        },
        {
          title: 'Espacio 3',
          url: '/app/spaces/3',
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
      case 'channels':
        return 'Channels';
      case 'workspaces':
        return 'Workspaces';
      default:
        return 'Tomatoe Chat';
    }
  }

  show(panel: string = 'menu', tabs: boolean = true) {
    this.panel = true;
    this.current = panel;
    this.tabs = tabs;
    switch (this.current) {
      case 'channels':
        this.items = this.defaultChats;
        break;
      case 'workspaces':
        this.items = this.defaultSpaces;
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
