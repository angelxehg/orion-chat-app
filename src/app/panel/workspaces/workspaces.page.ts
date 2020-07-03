import { Component } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { PanelService } from '../panel.service';

@Component({
  selector: 'app-workspace',
  templateUrl: 'workspaces.page.html',
  styleUrls: ['workspaces.page.scss']
})
export class WorkspacesPage {

  organizations = [
    {
      id: 1,
      title: "Organization 1",
      workspaces: [
        {
          id: 1,
          title: "Workspace 1",
          description: "Workspace 1 from Organization 1",
          url: '/app/workspaces/1',
        },
        {
          id: 2,
          title: "Workspace 2",
          description: "Workspace 2 from Organization 2",
          url: '/app/workspaces/2',
        },
        {
          id: 3,
          title: "Workspace 3",
          description: "Workspace 3 from Organization 3",
          url: '/app/workspaces/3',
        },
      ]
    },
  ]

  constructor(
    private auth: AuthService,
    private panel: PanelService
  ) { }

  ionViewWillEnter() {
    this.panel.hide();
    this.auth.access();
  }

  isUrlActive(url) {
    return window.location.pathname.includes(url);
  }
}
