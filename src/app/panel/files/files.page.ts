import { Component } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { PanelService } from '../panel.service';

@Component({
  selector: 'app-files',
  templateUrl: './files.page.html',
  styleUrls: ['./files.page.scss'],
})
export class FilesPage {

  constructor(
    private auth: AuthService,
    private panel: PanelService
  ) { }

  ionViewWillEnter() {
    this.panel.show();
    this.auth.access();
  }
}
