import { Component } from '@angular/core';
import { PanelService } from 'src/app/services/panel.service';

@Component({
  selector: 'app-more',
  templateUrl: './more.page.html',
  styleUrls: ['./more.page.scss'],
})
export class MorePage {

  public pageGroups = [
    {
      title: "Main",
      color: "primary",
      pages: [
        {
          title: 'Home',
          url: '/app/home',
          icon: 'home',
        },
        {
          title: 'Workspaces',
          url: '/app/workspaces',
          icon: 'briefcase',
        },
        {
          title: 'Channels',
          url: '/app/channels',
          icon: 'chatbubbles',
        },
      ]
    },
    {
      title: "Features",
      color: "success",
      pages: [
        {
          title: 'Search',
          url: '/app/search',
          icon: 'search',
        },
        {
          title: 'Files',
          url: '/app/files',
          icon: 'folder',
        },
      ]
    },
    {
      title: "Configuration",
      color: "tertiary",
      pages: [
        {
          title: 'Organization',
          url: '/app/organization',
          icon: 'people',
        },
        {
          title: 'Profile',
          url: '/app/profile',
          icon: 'person-circle',
        },
        {
          title: 'Settings',
          url: '/app/settings',
          icon: 'cog',
        },
      ]
    }
  ]

  constructor(
    public panel: PanelService
  ) { }

  ionViewWillEnter() {
    this.panel.show();
  }

}
