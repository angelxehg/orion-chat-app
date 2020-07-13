import { Component, OnInit } from '@angular/core';
import { PanelService } from '../services/panel.service';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.page.html',
  styleUrls: ['./panel.page.scss'],
})
export class PanelPage implements OnInit {

  public selectedIndex = 0;

  public pageGroups = [
    {
      title: "Main",
      pages: [
        {
          title: 'Main',
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

  ngOnInit() { }

  isUrlActive(url) {
    return window.location.pathname.includes(url);
  }

}
