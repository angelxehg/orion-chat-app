import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PanelService } from '../../../services/panel.service';
import { PageData } from '../../../models/page-data';
import { ChannelService } from 'src/app/services/channel.service';

@Component({
  selector: 'app-channel-details',
  templateUrl: './channel-details.page.html',
  styleUrls: ['./channel-details.page.scss'],
})
export class ChannelDetailsPage {

  public page: PageData;

  constructor(
    private activatedRoute: ActivatedRoute,
    public panel: PanelService,
    public chn: ChannelService
  ) {
    this.emptyMode();
  }

  ionViewWillEnter() {
    this.panel.show('channels', false);
    var param = this.activatedRoute.snapshot.paramMap.get('channel');
    if (!param) {
      if (window.location.pathname.includes("new")) {
        // Create mode
        this.createMode();
        this.chn.fetch().subscribe();
      } else {
        // Empty mode
        this.emptyMode();
      }
    } else {
      // Edit mode
      this.editMode();
      this.chn.fetch().subscribe();
    }
  }

  emptyMode() {
    this.page = {
      title: "Channel Details",
      description: "Create or select a channel...",
      action: "Empty",
      empty: true
    };
  }

  createMode() {
    this.page = {
      title: "Create a channel",
      description: "Create a new channel",
      action: "Create",
      empty: false
    };
  }

  editMode() {
    this.page = {
      title: "Edit channel",
      description: "Update channel data",
      action: "Update",
      empty: false
    };
  }

}
