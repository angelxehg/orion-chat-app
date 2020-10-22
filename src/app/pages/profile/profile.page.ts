import { Component } from '@angular/core';
import { PanelService } from '../../services/panel.service';
import { Profile } from 'src/app/models/profile';
import { ToastController } from '@ionic/angular';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage {

  private mode: string;

  public profile: Profile = new Profile();

  constructor(
    public panel: PanelService,
    public toastController: ToastController,
    public pro: ProfileService
  ) { }

  get title() {
    if (this.mode === 'Update') {
      return 'Update profile';
    }
    return 'My profile';
  }

  get description() {
    if (this.mode === 'Update') {
      return 'Update profile data';
    }
    return 'My profile data';
  }

  get readMode() {
    return this.mode === 'Read';
  }

  get updateMode() {
    return this.mode === 'Update';
  }

  ionViewWillEnter() {
    this.panel.show();
    this.mode = 'Read';
    this.pro.current.subscribe({
      next: async (current) => {
        this.profile = current;
      },
    });
  }

  public edit() {
    this.mode = 'Update';
  }

  public cancel() {
    if (this.updateMode) {
      this.mode = 'Read';
    }
  }

  public save() {
    if (this.updateMode) {
      this.update();
    }
  }

  private async update() {
    const toast = await this.toast('Updating Profile data...');
    this.pro.update(this.profile).subscribe({
      next: async (updated) => {
        toast.dismiss().then(() => this.toast('Profile updated!', 'success', true));
        this.mode = 'Read';
        this.profile = updated;
      },
      error: async (err) => {
        toast.dismiss().then(() => this.toast('Error updating profile!', 'danger', true));
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
}
