import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { MenuGroup } from '../models/menu';
import { OrganizationService } from './organization.service';

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

  private items: MenuGroup[] = [];
  private items$ = new Subject<MenuGroup[]>();

  public menuItems = this.items$.asObservable();

  constructor(
    private org: OrganizationService
  ) {
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
        const current = this.org.current();
        const extra = current ? ' | ' + current.title : '';
        return 'Tomatoe Chat' + extra;
    }
  }

  show(panel: string = 'menu', tabs: boolean = true) {
    this.panel = true;
    this.current = panel;
    this.tabs = tabs;
    if (this.current === 'menu') {
      this.items = this.defaultMenu;
      this.items$.next(this.items);
    } else {
      this.items = [];
      this.items$.next(this.items);
    }
  }

  hide() {
    this.panel = false;
    this.tabs = false;
  }
}
