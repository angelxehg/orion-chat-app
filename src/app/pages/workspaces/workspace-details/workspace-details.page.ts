import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PanelService } from '../../../services/panel.service';
import { PageData } from '../../../models/page-data';

@Component({
  selector: 'app-workspace-details',
  templateUrl: './workspace-details.page.html',
  styleUrls: ['./workspace-details.page.scss'],
})
export class WorkspaceDetailsPage {

  public page: PageData;

  constructor(
    private activatedRoute: ActivatedRoute,
    public panel: PanelService
  ) {
    this.emptyMode();
  }

  ionViewWillEnter() {
    var param = this.activatedRoute.snapshot.paramMap.get('workspace');
    if (!param) {
      if (window.location.pathname.includes("new")) {
        // Create mode
        this.createMode();
      } else {
        // Empty mode
        this.emptyMode();
      }
    } else {
      // Edit mode
      this.editMode();
    }
  }

  emptyMode() {
    this.page = {
      title: "Workspace Details",
      description: "Create or select a workspace...",
      action: "Empty",
      empty: true
    };
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

}
