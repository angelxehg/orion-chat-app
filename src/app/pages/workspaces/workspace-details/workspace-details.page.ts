import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PanelService } from '../../../services/panel.service';
import { PageData } from '../../../models/page-data';
import { Workspace } from 'src/app/models/workspace';
import { WorkspaceService } from 'src/app/services/workspace.service';
import { ToastController } from '@ionic/angular';

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
    public panel: PanelService,
    private router: Router,
    public toastController: ToastController,
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
      return this.create();
    }
    if (this.page.action == "Update") {
      return this.update();
    }
  }

  private async create() {
    var toast = await this.toast("Creating Workspace data...");
    this.wks.create(this.workspace).subscribe({
      next: async (created) => {
        toast.dismiss().then(() => this.toast("Workspace created!"));
        this.router.navigateByUrl(`/app/workspaces/${created.id}`);
      },
      error: async (err) => {
        toast.dismiss().then(() => this.toast("Error creating workspace!"));
        if ('error' in err) {
          this.error = err.error;
        }
        console.error(err);
      }
    });
  }

  private async update() {
    var toast = await this.toast("Updating Workspace data...");
    this.wks.update(this.workspace).subscribe({
      next: async (updated) => {
        toast.dismiss().then(() => this.toast("Workspace data updated!"));
      },
      error: async (err) => {
        toast.dismiss().then(() => this.toast("Error updating data!"));
        if ('error' in err) {
          this.error = err.error;
        }
        console.error(err);
      }
    });
  }

  private async toast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 5000
    });
    toast.present();
    return toast;
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
    this.workspace = new Workspace();
  }

  clearError() {
    this.error = {
      title: '',
      description: ''
    }
  }

}
