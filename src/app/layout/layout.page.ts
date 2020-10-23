import { Component } from '@angular/core';
import { PanelService } from '../services/panel.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.page.html',
  styleUrls: ['./layout.page.scss'],
})
export class LayoutPage {

  constructor(public panel: PanelService) { }

}
