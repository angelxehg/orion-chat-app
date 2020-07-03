import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PanelService } from '../../panel.service';

@Component({
  selector: 'app-workspace-details',
  templateUrl: './workspace-details.page.html',
  styleUrls: ['./workspace-details.page.scss'],
})
export class WorkspaceDetailsPage implements OnInit {

  public page: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private panel: PanelService
  ) { }

  ngOnInit() {
    this.page = this.activatedRoute.snapshot.paramMap.get('workspace');
  }

}