import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PanelService } from '../../../services/panel.service';
import { ChannelService } from 'src/app/services/channel.service';
import { Channel } from 'src/app/models/channel';
import { ToastController, AlertController, IonContent } from '@ionic/angular';
import { Message } from 'src/app/models/message';

@Component({
  selector: 'app-channel-details',
  templateUrl: './channel-details.page.html',
  styleUrls: ['./channel-details.page.scss'],
})
export class ChannelDetailsPage {

  public channel: Channel;

  private mode: string;

  public error;

  constructor(
    private activatedRoute: ActivatedRoute,
    public panel: PanelService,
    public chn: ChannelService,
    private router: Router,
    public toastController: ToastController,
    public alertController: AlertController
  ) {
    this.clear();
    this.mode = 'Create';

  }

  get title() {
    if (this.mode === 'Read') {
      return this.channel.title;
    }
    return this.mode + ' channel';
  }

  get description() {
    if (this.mode === 'Read') {
      return this.channel.title + ' channel data';
    }
    if (this.mode === 'Update') {
      return 'Update channel data';
    }
    return 'Create a new channel';
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
    this.clear();
    this.panel.show('channels', false);
    const param = this.activatedRoute.snapshot.paramMap.get('channel');
    if (param) {
      this.mode = 'Read';
      const thisID = parseInt(param, 10);
      this.chn.find(thisID).subscribe({
        next: (found) => {
          this.channel = Object.create(found);
        }
      });
    } else {
      this.mode = 'Create';
      this.chn.fetch().subscribe();
    }
  }

  public edit() {
    this.mode = 'Update';
  }

  public cancel() {
    this.clearError();
    if (this.createMode) {
      this.router.navigateByUrl(`/app/channels`);
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

  public async delete() {
    if (!this.updateMode) {
      return;
    }
    const alert = await this.alertController.create({
      header: 'Remove this channel?',
      message: 'All channel data will be removed',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'Remove',
          handler: () => {
            this.remove();
          }
        }
      ]
    });
    await alert.present();
  }

  private async create() {
    const toast = await this.toast('Creating Channel data...');
    this.chn.create(this.channel).subscribe({
      next: async (created) => {
        toast.dismiss().then(() => this.toast('Channel created!', 'success', true));
        this.router.navigateByUrl(`/app/channels/${created.id}`);
      },
      error: async (err) => {
        toast.dismiss().then(() => this.toast('Error creating channel!', 'danger', true));
        if ('error' in err) {
          this.error = err.error;
        }
        console.error(err);
      }
    });
  }

  private async update() {
    const toast = await this.toast('Updating Channel data...');
    this.chn.update(this.channel).subscribe({
      next: async (updated) => {
        toast.dismiss().then(() => this.toast('Channel data updated!', 'success', true));
        this.mode = 'Read';
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

  private async remove() {
    const toast = await this.toast('Removing channel...', 'warning');
    this.chn.remove(this.channel).subscribe({
      next: async () => {
        toast.dismiss().then(() => this.toast('Channel removed!', 'success', true));
        this.router.navigateByUrl(`/app/channels`);
      },
      error: async (err) => {
        toast.dismiss().then(() => this.toast('Error removing channel!', 'danger', true));
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
    this.channel = new Channel();
  }

  clearError() {
    this.error = {
      title: '',
      description: ''
    };
  }
}
