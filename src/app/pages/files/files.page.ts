import { Component } from '@angular/core';
import { PanelService } from '../../services/panel.service';

@Component({
  selector: 'app-files',
  templateUrl: './files.page.html',
  styleUrls: ['./files.page.scss'],
})
export class FilesPage {

  constructor(
    public panel: PanelService
  ) { }

  ionViewWillEnter() {
    this.panel.show();
  }
}
