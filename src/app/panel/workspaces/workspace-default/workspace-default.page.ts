import { Component } from '@angular/core';
import { PanelService } from '../../panel.service';

@Component({
  selector: 'app-workspace-default',
  templateUrl: './workspace-default.page.html',
  styleUrls: ['./workspace-default.page.scss'],
})
export class WorkspaceDefaultPage {

  constructor(public panel: PanelService) { }
}
