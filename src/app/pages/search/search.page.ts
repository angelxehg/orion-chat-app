import { Component } from '@angular/core';
import { PanelService } from '../../services/panel.service';

@Component({
  selector: 'app-search',
  templateUrl: 'search.page.html',
  styleUrls: ['search.page.scss']
})
export class SearchPage {

  constructor(
    public panel: PanelService
  ) { }

  ionViewWillEnter() {
    this.panel.show();
  }
}
