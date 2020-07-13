import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { PanelService } from '../../services/panel.service';
import { WorkspaceService } from 'src/app/services/workspace.service';

@Component({
  selector: 'app-workspace',
  templateUrl: 'workspaces.page.html',
  styleUrls: ['workspaces.page.scss']
})
export class WorkspacesPage {

  constructor(
    private auth: AuthService,
    public panel: PanelService,
    public workspaces: WorkspaceService
  ) { }

  ionViewWillEnter() {
    this.panel.hide();
    this.auth.access();
    this.workspaces.fetch();
  }

  isUrlActive(url) {
    return window.location.pathname.includes(url);
  }
}
