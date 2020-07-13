import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PanelService } from '../../../services/panel.service';

@Component({
  selector: 'app-channel-details',
  templateUrl: './channel-details.page.html',
  styleUrls: ['./channel-details.page.scss'],
})
export class ChannelDetailsPage {

  public page: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    public panel: PanelService
  ) { }

  ngOnInit() {
    this.page = this.activatedRoute.snapshot.paramMap.get('channel');
  }

}