import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

interface SimplifiedOptions {
  message: string;
  color?: string;
  duration?: number;
}

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private toastController: ToastController) { }

  private async toast(options: SimplifiedOptions) {
    const toast = await this.toastController.create(options);
    toast.present();
    return toast;
  }

  public waiting = (message: string) => this.toast({ message });

  public success = (message: string, duration: number = 1000) => this.toast({ message, duration, color: 'success' });

  public error = (message: string, duration: number = 1000) => this.toast({ message, duration, color: 'danger' });

}
