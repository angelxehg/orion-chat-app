import { Component } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-workspace',
  templateUrl: 'workspace.page.html',
  styleUrls: ['workspace.page.scss']
})
export class WorkspacePage {

  constructor(private auth: AuthService) { }

  ionViewWillEnter() {
    this.auth.access();
  }
}
