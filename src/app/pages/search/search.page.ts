import { Component } from '@angular/core';
import { PanelService } from '../../services/panel.service';
import { SearchResult } from 'src/app/models/search-result';
import { SearchService } from 'src/app/services/search.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-search',
  templateUrl: 'search.page.html',
  styleUrls: ['search.page.scss']
})
export class SearchPage {

  public criteria: string;

  public results: Array<SearchResult>;

  constructor(
    public panel: PanelService,
    private sch: SearchService,
    public toastController: ToastController,
  ) { }

  ionViewWillEnter() {
    this.criteria = "";
    this.panel.show();
  }

  public async search() {
    var toast = await this.toast("Searching...");
    this.sch.find(this.criteria).subscribe({
      next: async (results) => {
        toast.dismiss().then(() => this.toast("Search complete!", 'success', true));
        this.results = results;
      },
      error: async (err) => {
        toast.dismiss().then(() => this.toast("Error searching!", 'danger', true));
        console.error(err);
      }
    })
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
}
