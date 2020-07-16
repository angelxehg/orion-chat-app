import { Component } from '@angular/core';
import { WorkspaceService } from 'src/app/services/workspace.service';

@Component({
  selector: 'app-workspace-menu',
  templateUrl: './workspace-menu.component.html',
  styleUrls: ['./workspace-menu.component.scss'],
})
export class WorkspaceMenuComponent {

  constructor(
    private wks: WorkspaceService
  ) { }

  isUrlActive(url) {
    return window.location.pathname.includes(url);
  }

  all() {
    return this.wks.all();
  }
}
