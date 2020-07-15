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
          description: "Pin your favorite channels and workspaces"
        },
        {
          title: 'Channels',
          url: '/app/channels',
          icon: 'chatbubbles',
          description: "Communicate with people through channels"
        },
        {
          title: 'Workspaces',
          url: '/app/workspaces',
          icon: 'briefcase',
          description: "Manage all your workspaces in one place"
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
          description: "Find messages and files across the app"
        },
        {
          title: 'Files',
          url: '/app/files',
          icon: 'folder',
          description: "Find and organize the files you need"
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
          description: "Setup or create a new organization"
        },
        {
          title: 'Profile',
          url: '/app/profile',
          icon: 'person-circle',
          description: "Setup your organization profile"
        },
        {
          title: 'Settings',
          url: '/app/settings',
          icon: 'cog',
          description: "Change UI or log out"
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
