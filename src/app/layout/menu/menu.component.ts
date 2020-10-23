import { Component, } from '@angular/core';
import { Observable } from 'rxjs';
import { MenuGroup } from 'src/app/models/menu';
import { PanelService } from 'src/app/services/panel.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent {

  menuGroups: Observable<MenuGroup[]> = this.panel.menuItems;

  constructor(private panel: PanelService) { }

  isUrlActive(url) {
    return window.location.pathname.includes(url);
  }

}
