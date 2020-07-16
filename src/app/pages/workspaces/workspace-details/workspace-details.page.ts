import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PanelService } from '../../../services/panel.service';
import { PageData } from '../../../models/page-data';
import { Workspace } from 'src/app/models/workspace';
import { WorkspaceService } from 'src/app/services/workspace.service';

@Component({
  selector: 'app-workspace-details',
  templateUrl: './workspace-details.page.html',
  styleUrls: ['./workspace-details.page.scss'],
})
export class WorkspaceDetailsPage {

  public workspace: Workspace;

  public page: PageData;

  public error;

  constructor(
    private wks: WorkspaceService,
    private activatedRoute: ActivatedRoute,
    public panel: PanelService
  ) {
    this.clear();
    this.createMode();
  }

  ionViewWillEnter() {
    this.clear();
    this.panel.show('workspaces', false);
    var param = this.activatedRoute.snapshot.paramMap.get('workspace');
    if (param) {
      this.editMode();
      var thisID = parseInt(param);
      this.wks.find(thisID).subscribe({
        next: (found) => {
          this.workspace = Object.create(found);
        }
      });
    } else {
      this.createMode();
    }
  }

  async action() {
    this.clearError();
    if (this.page.action == "Create") {
      // return this.create();
    }
    if (this.page.action == "Update") {
      // return this.update();
    }
  }

  createMode() {
    this.page = {
      title: "Create a workspace",
      description: "Create a new workspace",
      action: "Create",
      empty: false
    };
  }

  editMode() {
    this.page = {
      title: "Edit workspace",
      description: "Update workspace data",
      action: "Update",
      empty: false
    };
  }

  clear() {
    this.clearError();
    this.workspace = {
      id: 0,
      title: "",
      description: "",
      admin_flag: false,
      people: []
    }
  }

  clearError() {
    this.error = {
      title: '',
      description: ''
    }
  }

}
