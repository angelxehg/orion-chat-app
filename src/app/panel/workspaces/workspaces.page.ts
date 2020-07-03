import { Component } from '@angular/core';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-workspace',
  templateUrl: 'workspaces.page.html',
  styleUrls: ['workspaces.page.scss']
})
export class WorkspacesPage {

  constructor(private auth: AuthService) { }

  ionViewWillEnter() {
    this.auth.access();
  }
}
