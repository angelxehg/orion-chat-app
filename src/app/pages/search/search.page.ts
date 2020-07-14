import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { PanelService } from '../../services/panel.service';

@Component({
  selector: 'app-search',
  templateUrl: 'search.page.html',
  styleUrls: ['search.page.scss']
})
export class SearchPage {

  constructor(
    private auth: AuthService,
    public panel: PanelService
  ) { }

  ionViewWillEnter() {
    this.panel.show();
    this.auth.access();
  }
}
