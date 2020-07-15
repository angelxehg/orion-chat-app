import { Component } from '@angular/core';
import { PanelService } from '../../services/panel.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {

  public tiles = [
    {
      title: "All workspaces",
      url: "/app/workspaces",
      icon: "briefcase",
      color: "primary",
    },
    {
      title: "All channels",
      url: "/app/channels",
      icon: "chatbubbles",
      color: "success",
    },
  ];

  constructor(
    public panel: PanelService
  ) { }

  ionViewWillEnter() {
    this.panel.show();
  }

}
