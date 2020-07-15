import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PanelService {

  public panel: boolean;
  public tabs: boolean;

  public current: string;

  constructor() {
    this.show();
  }

  title() {
    switch (this.current) {
      case 'channels':
        return "Channels"
      case 'workspaces':
        return "Workspaces"
      default:
        return "Orion Chat"
    }
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
