import { Component } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { PanelService } from '../panel.service';
import { OrganizationService } from 'src/app/services/organization.service';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Organization } from 'src/app/services/organization';

@Component({
  selector: 'app-organization',
  templateUrl: './organization.page.html',
  styleUrls: ['./organization.page.scss'],
})
export class OrganizationPage {

  constructor(
    private auth: AuthService,
    private router: Router,
    public panel: PanelService,
    public org: OrganizationService,
    public toastController: ToastController
  ) { }

  ionViewWillEnter() {
    this.panel.hide();
    this.auth.access();
    this.org.fetch().subscribe({
      next: (data) => { },
      error: err => { }
    });
  }

  async openOrganization(organization: Organization) {
    const toast = await this.toastController.create({
      message: "Loading organization...",
      duration: 5000
    });
    toast.present();
    this.org.current.set(organization).subscribe({
      next: () => {
        toast.dismiss();
        if (organization.admin_flag) {
          var url = '/app/organization/' + organization.id;
          return this.router.navigateByUrl(url);
        }
        return this.router.navigateByUrl('/app/home');
      },
      error: async err => {
        toast.dismiss();
        const toast2 = await this.toastController.create({
          message: "Error selecting organization!",
          duration: 2000
        });
        toast2.present();
      }
    });
  }
}
