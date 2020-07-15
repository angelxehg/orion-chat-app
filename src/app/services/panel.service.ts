import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PanelService {

  public hidden: boolean;

  public viewMode: string;

  constructor() {
    this.show();
  }

  title() {
    switch (this.viewMode) {
      case 'channels':
        return "Channels"
      case 'workspaces':
        return "Workspaces"
      default:
        return "Orion Chat"
    }
  }

  show(panel: string = 'menu') {
    this.hidden = false;
    this.viewMode = panel;
  }

  hide() {
    this.hidden = true;
  }
}
