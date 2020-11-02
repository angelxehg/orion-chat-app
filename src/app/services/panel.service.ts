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

  public items: any[];

  public panel: boolean;
  public tabs: boolean;

  public current: string;

  constructor() {
    this.show();
  }

  title() {
    switch (this.current) {
      case 'chats':
        return 'Chats';
      default:
        return 'Tomatoe Chat';
    }
  }

  updateItems(items: any[]) {
    this.items = items;
  }

  show(panel: string = 'menu', tabs: boolean = true) {
    this.panel = true;
    this.current = panel;
    this.tabs = tabs;
  }

  hide() {
    this.panel = false;
    this.tabs = false;
  }
}
