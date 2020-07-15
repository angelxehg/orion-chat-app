import { Component } from '@angular/core';
import { PanelService } from '../../services/panel.service';
import { WorkspaceService } from 'src/app/services/workspace.service';

@Component({
  selector: 'app-workspace',
  templateUrl: 'workspaces.page.html',
  styleUrls: ['workspaces.page.scss']
})
export class WorkspacesPage {

  constructor(
    public panel: PanelService,
    public workspaces: WorkspaceService
  ) { }

  ionViewWillEnter() {
    this.panel.show('workspaces');
    this.workspaces.fetch();
  }

  isUrlActive(url) {
    return window.location.pathname.includes(url);
  }

  all() {
    return this.workspaces.all();
  }
}
