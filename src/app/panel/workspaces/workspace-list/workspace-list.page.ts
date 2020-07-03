import { Component } from '@angular/core';
import { PanelService } from '../../panel.service';

@Component({
  selector: 'app-workspace-list',
  templateUrl: './workspace-list.page.html',
  styleUrls: ['./workspace-list.page.scss'],
})
export class WorkspaceListPage {

  constructor(private panel: PanelService) { }
}
