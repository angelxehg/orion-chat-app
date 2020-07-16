import { Component } from '@angular/core';
import { PanelService } from '../../../services/panel.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Organization } from '../../../models/organization';
import { OrganizationService } from 'src/app/services/organization.service';
import { PageData } from '../../../models/page-data';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-organization-details',
  templateUrl: './organization-details.page.html',
  styleUrls: ['./organization-details.page.scss'],
})
export class OrganizationDetailsPage {

  public organization: Organization;

  public page: PageData;

  public error;

  constructor(
    private route: ActivatedRoute,
    private org: OrganizationService,
    public panel: PanelService,
    private router: Router,
    public toastController: ToastController,
  ) {
    this.clear();
    this.createMode();
  }

  ionViewWillEnter() {
    // Panel
    this.panel.show('menu', false);
    // Configure mode
    this.clear();
    var param = this.route.snapshot.paramMap.get('organization');
    if (!param) {
      // New mode
      this.createMode();
    } else {
      // Edit mode
      this.editMode();
      var thisID = parseInt(param);
      this.org.find(thisID).subscribe({
        next: (found) => {
          this.organization = Object.create(found);
        }
      })
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
    var toast = await this.toast("Creating Organization data...");
    this.org.create(this.organization).subscribe({
      next: async (created) => {
        toast.dismiss().then(() => this.toast("Organization created!"));
        this.org.select(created.id).subscribe({
          next: (selected) => {
            this.router.navigateByUrl('/app/home');
          }
        });
      },
      error: async (err) => {
        toast.dismiss().then(() => this.toast("Error creating organization!"));
        if ('error' in err) {
          this.error = err.error;
        }
        console.error(err);
      }
    });
  }

  private async update() {
    var toast = await this.toast("Updating Organization data...");
    this.org.update(this.organization).subscribe({
      next: async (updated) => {
        toast.dismiss().then(() => this.toast("Organization data updated!"));
        this.router.navigateByUrl('/app/organization');
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
      title: "Create organization",
      description: "Create a new organization",
      action: "Create",
      empty: false
    };
  }

  editMode() {
    this.page = {
      title: "Edit organization",
      description: "Update organization data",
      action: "Update",
      empty: false
    };
  }

  clear() {
    this.clearError();
    this.organization = {
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
