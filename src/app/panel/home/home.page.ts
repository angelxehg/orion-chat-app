import { Component } from '@angular/core';
import { PanelService } from '../panel.service';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {

  constructor(
    private auth: AuthService,
    private panel: PanelService
  ) { }

  ionViewWillEnter() {
    this.panel.show();
    this.auth.access();
  }

}
