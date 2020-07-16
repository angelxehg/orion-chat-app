import { Component } from '@angular/core';
import { PanelService } from '../../services/panel.service';
import { OrganizationService } from 'src/app/services/organization.service';
import { Organization } from 'src/app/models/organization';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {

  public organization: Organization;

  public tiles = [
    {
      title: "All workspaces",
      url: "/app/workspaces",
      icon: "briefcase",
      color: "primary",
    },
    {
      title: "All channels",
      url: "/app/channels",
      icon: "chatbubbles",
      color: "success",
    },
  ];

  constructor(
    public panel: PanelService,
    public org: OrganizationService
  ) { }

  ionViewWillEnter() {
    this.panel.show();
    this.org.selected.subscribe({
      next: (found) => {
        this.organization = Object.create(found);
      }
    })
  }

}
