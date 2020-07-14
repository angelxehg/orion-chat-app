import { Component, OnInit } from '@angular/core';
import { PanelService } from '../services/panel.service';
import { ThemeService } from '../services/theme.service';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.page.html',
  styleUrls: ['./panel.page.scss'],
})
export class PanelPage implements OnInit {

  public selectedIndex = 0;

  public tabs = [
    {
      title: 'Home',
      url: 'home',
      icon: 'home',
    },
    {
      title: 'Channels',
      url: 'channels',
      icon: 'chatbubbles',
    },
    {
      title: 'Search',
      url: 'search',
      icon: 'search',
    },
    {
      title: 'More',
      url: 'more',
      icon: 'ellipsis-horizontal',
    },
  ]

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
    private theme: ThemeService
  ) {
    this.theme.load();
  }

  ngOnInit() { }

  isUrlActive(url) {
    return window.location.pathname.includes(url);
  }

}
