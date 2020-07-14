import { Component, OnInit } from '@angular/core';
import { PanelService } from 'src/app/services/panel.service';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.scss'],
})
export class MainMenuComponent implements OnInit {

  public pageGroups = [
    {
      title: "Main",
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
    public panel: PanelService,
  ) { }

  ngOnInit() { }

  isUrlActive(url) {
    return window.location.pathname.includes(url);
  }

}
