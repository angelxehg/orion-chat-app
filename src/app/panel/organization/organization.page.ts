import { Component } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { PanelService } from '../panel.service';

@Component({
  selector: 'app-organization',
  templateUrl: './organization.page.html',
  styleUrls: ['./organization.page.scss'],
})
export class OrganizationPage {

  constructor(
    private auth: AuthService,
    public panel: PanelService
  ) { }

  ionViewWillEnter() {
    this.panel.hide();
    this.auth.access();
  }
}
