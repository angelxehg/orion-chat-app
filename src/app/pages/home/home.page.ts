import { Component } from '@angular/core';
import { PanelService } from '../../services/panel.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {

  colors = ['primary', 'secondary', 'tertiary', 'success', 'warning', 'danger'];

  constructor(public panel: PanelService) { }

  ionViewWillEnter() {
    this.panel.show();
  }

}
