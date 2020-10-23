import { Component } from '@angular/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.page.html',
  styleUrls: ['./layout.page.scss'],
})
export class LayoutPage {

  constructor() { }

  activeIcon(tab: string, icon: string) {
    if (window.location.pathname.includes(tab)) {
      return icon;
    }
    return `${icon}-outline`;
  }

}
