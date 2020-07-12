import { Component } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { PanelService } from '../panel.service';
import { OrganizationService } from 'src/app/services/organization.service';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

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
    this.org.fetch();
  }

  async openOrganization(organization) {
    const toast = await this.toastController.create({
      message: "Loading organization...",
      duration: 5000
    });
    toast.present();
    this.org.loadOrganization(organization).subscribe({
      next: () => {
        toast.dismiss();
        this.router.navigateByUrl('/app/home');
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
