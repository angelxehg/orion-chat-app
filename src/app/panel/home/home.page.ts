import { Component } from '@angular/core';
import { PanelService } from '../panel.service';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {

  public tileGroups = [
    {
      tiles: [
        {
          title: "All workspaces",
          url: "/app/workspaces",
          icon: "briefcase",
          color: "primary",
        },
        {
          title: "Workspace 1",
          url: "/app/workspaces/1",
          icon: "briefcase",
          color: "primary",
        },
        {
          title: "Workspace 2",
          url: "/app/workspaces/2",
          icon: "briefcase",
          color: "primary",
        },
        {
          title: "Workspace 3",
          url: "/app/workspaces/3",
          icon: "briefcase",
          color: "primary",
        },
      ]
    },
    {
      tiles: [
        {
          title: "All channels",
          url: "/app/channels",
          icon: "chatbubbles",
          color: "success",
        },
        {
          title: "Channel 1",
          url: "/app/channels/1",
          icon: "chatbubbles",
          color: "success",
        },
        {
          title: "Channel 2",
          url: "/app/channels/2",
          icon: "chatbubbles",
          color: "success",
        },
        {
          title: "Channel 3",
          url: "/app/channels/3",
          icon: "chatbubbles",
          color: "success",
        },
      ]
    },
  ];

  constructor(
    private auth: AuthService,
    public panel: PanelService
  ) { }

  ionViewWillEnter() {
    this.panel.show();
    this.auth.access();
  }

}
