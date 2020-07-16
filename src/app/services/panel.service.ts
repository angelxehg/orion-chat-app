import { Injectable } from '@angular/core';
import { OrganizationService } from './organization.service';

@Injectable({
  providedIn: 'root'
})
export class PanelService {

  public panel: boolean;
  public tabs: boolean;

  public current: string;

  constructor(
    private org: OrganizationService
  ) {
    this.show();
  }

  title() {
    switch (this.current) {
      case 'channels':
        return "Channels";
      case 'workspaces':
        return "Workspaces";
      default:
        var current = this.org.current();
        var extra = current ? ' | ' + current.title : '';
        return "Orion Chat" + extra;
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
