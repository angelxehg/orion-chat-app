import { Component } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { PanelService } from '../panel.service';
import { OrganizationService } from 'src/app/services/organization.service';

@Component({
  selector: 'app-organization',
  templateUrl: './organization.page.html',
  styleUrls: ['./organization.page.scss'],
})
export class OrganizationPage {

  public selected: number;

  constructor(
    private auth: AuthService,
    public panel: PanelService,
    public org: OrganizationService,
  ) { }

  ionViewWillEnter() {
    this.panel.hide();
    this.auth.access();
    this.org.fetch().subscribe();
    this.org.organization.subscribe({
      next: (value) => {
        this.selected = value;
      }
    })
  }
}
