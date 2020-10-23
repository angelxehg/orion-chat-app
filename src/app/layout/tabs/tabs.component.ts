import { Component } from '@angular/core';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
})
export class TabsComponent {

  constructor() { }

  activeIcon(tab: string, icon: string) {
    if (window.location.pathname.includes(tab)) {
      return icon;
    }
    return `${icon}-outline`;
  }

}
