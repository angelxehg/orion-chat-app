import { Component } from '@angular/core';
import { PanelService } from '../../services/panel.service';
import { OrganizationService } from 'src/app/services/organization.service';

@Component({
  selector: 'app-organization',
  templateUrl: './organization.page.html',
  styleUrls: ['./organization.page.scss'],
})
export class OrganizationPage {

  public selected: number;

  constructor(
    public panel: PanelService,
    public org: OrganizationService,
  ) { }

  ionViewWillEnter() {
    this.panel.hide();
    this.org.fetch().subscribe();
    this.org.selected.subscribe({
      next: (value) => {
        this.selected = value;
      }
    })
  }
}
