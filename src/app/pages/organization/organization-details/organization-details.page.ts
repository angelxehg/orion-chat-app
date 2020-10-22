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

  private mode: string;

  public error;

  constructor(
    private route: ActivatedRoute,
    private org: OrganizationService,
    public panel: PanelService,
    private router: Router,
    public toastController: ToastController,
  ) {
    this.clear();
    this.mode = 'Create';
  }

  get title() {
    if (this.mode === 'Read') {
      return this.organization.title;
    }
    return this.mode + ' organization';
  }

  get description() {
    if (this.mode === 'Read') {
      return this.organization.title + ' organization data';
    }
    if (this.mode === 'Update') {
      return 'Update organization data';
    }
    return 'Create a new organization';
  }

  get createMode() {
    return this.mode === 'Create';
  }

  get readMode() {
    return this.mode === 'Read';
  }

  get updateMode() {
    return this.mode === 'Update';
  }

  ionViewWillEnter() {
    // Panel
    this.panel.show('menu', false);
    // Configure mode
    this.clear();
    const param = this.route.snapshot.paramMap.get('organization');
    if (param) {
      this.mode = 'Read';
      const thisID = parseInt(param, 0);
      this.org.find(thisID).subscribe({
        next: (found) => {
          this.organization = Object.create(found);
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
      this.router.navigateByUrl(`/app/organization`);
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
    const toast = await this.toast('Creating Organization data...');
    this.org.create(this.organization).subscribe({
      next: async (created) => {
        toast.dismiss().then(() => this.toast('Organization created!', 'success', true));
        this.org.select(created.id).subscribe({
          next: (selected) => {
            this.router.navigateByUrl('/app/home');
          }
        });
      },
      error: async (err) => {
        toast.dismiss().then(() => this.toast('Error creating organization!', 'danger', true));
        if ('error' in err) {
          this.error = err.error;
        }
        console.error(err);
      }
    });
  }

  private async update() {
    const toast = await this.toast('Updating Organization data...');
    this.org.update(this.organization).subscribe({
      next: async (updated) => {
        toast.dismiss().then(() => this.toast('Organization data updated!', 'success', true));
        this.router.navigateByUrl('/app/home');
      },
      error: async (err) => {
        toast.dismiss().then(() => this.toast('Error updating data!', 'danger', true));
        if ('error' in err) {
          this.error = err.error;
        }
        console.error(err);
      }
    });
  }

  private async toast(message: string, color: string = 'dark', dismiss: boolean = false) {
    const buttons = !dismiss ? [] : [{
      text: 'Close',
      role: 'cancel'
    }];
    const toast = await this.toastController.create({
      message,
      duration: 5000,
      color,
      buttons
    });
    toast.present();
    return toast;
  }

  clear() {
    this.clearError();
    this.organization = new Organization();
  }

  clearError() {
    this.error = {
      title: '',
      description: ''
    };
  }
}
