import { Component } from '@angular/core';
import { PanelService } from 'src/app/services/panel.service';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
})
export class TabsComponent {

  constructor(public panel: PanelService) { }

  activeIcon(tab: string, icon: string) {
    if (window.location.pathname.includes(tab)) {
      return icon;
    }
    return `${icon}-outline`;
  }

}
