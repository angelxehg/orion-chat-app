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

  private mode: string;

  public error;

  constructor(
    private wks: WorkspaceService,
    private activatedRoute: ActivatedRoute,
    public panel: PanelService,
    private router: Router,
    public toastController: ToastController,
  ) {
    this.clear();
    this.mode = 'Create';
  }

  get title() {
    if (this.mode == 'Read') {
      return this.workspace.title;
    }
    return this.mode + " workspace";
  }

  get description() {
    if (this.mode == 'Read') {
      return this.workspace.title + " workspace data";
    }
    if (this.mode == 'Update') {
      return "Update workspace data";
    }
    return "Create a new workspace";
  }

  get createMode() {
    return this.mode == 'Create';
  }

  get readMode() {
    return this.mode == 'Read';
  }

  get updateMode() {
    return this.mode == 'Update';
  }

  ionViewWillEnter() {
    this.clear();
    this.panel.show('workspaces', false);
    var param = this.activatedRoute.snapshot.paramMap.get('workspace');
    if (param) {
      this.mode = 'Read';
      var thisID = parseInt(param);
      this.wks.find(thisID).subscribe({
        next: (found) => {
          this.workspace = Object.create(found);
        }
      });
    } else {
      this.mode = 'Create';
    }
  }

  public edit() {
    this.mode = 'Update';
  }

  public cancel() {
    this.clearError();
    if (this.createMode) {
      this.router.navigateByUrl(`/app/workspaces`);
    }
    if (this.updateMode) {
      this.mode = 'Read';
    }
  }

  public save() {
    this.clearError();
    if (this.createMode) {
      this.create();
    }
    if (this.updateMode) {
      this.update();
    }
  }

  private async create() {
    var toast = await this.toast("Creating Workspace data...");
    this.wks.create(this.workspace).subscribe({
      next: async (created) => {
        toast.dismiss().then(() => this.toast("Workspace created!", 'success', true));
        this.router.navigateByUrl(`/app/workspaces/${created.id}`);
      },
      error: async (err) => {
        toast.dismiss().then(() => this.toast("Error creating workspace!", 'danger', true));
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
        toast.dismiss().then(() => this.toast("Workspace data updated!", 'success', true));
        this.mode = 'Read';
      },
      error: async (err) => {
        toast.dismiss().then(() => this.toast("Error updating data!", 'danger', true));
        if ('error' in err) {
          this.error = err.error;
        }
        console.error(err);
      }
    });
  }

  private async toast(message: string, color: string = 'dark', dismiss: boolean = false) {
    var buttons = !dismiss ? [] : [{
      text: 'Close',
      role: 'cancel'
    }]
    const toast = await this.toastController.create({
      message: message,
      duration: 5000,
      color: color,
      buttons: buttons
    });
    toast.present();
    return toast;
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
