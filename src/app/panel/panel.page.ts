import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.page.html',
  styleUrls: ['./panel.page.scss'],
})
export class PanelPage implements OnInit {

  public selectedIndex = 0;

  constructor(private menu: MenuController, private activatedRoute: ActivatedRoute) { }

  public pages = [
    {
      title: 'Organization',
      url: '/app/organization',
      icon: 'people'
    },
    {
      title: 'Workspace',
      url: '/app/workspace',
      icon: 'briefcase'
    },
    {
      title: 'Channels',
      url: '/app/channels',
      icon: 'chatbubbles'
    },
    {
      title: 'Search',
      url: '/app/search',
      icon: 'search'
    },
    {
      title: 'Profile',
      url: '/app/profile',
      icon: 'person-circle'
    },
    {
      title: 'Settings',
      url: '/app/settings',
      icon: 'cog'
    },
  ];

  ngOnInit() {
    const path = window.location.pathname.split('folder/')[1];
    if (path !== undefined) {
      this.selectedIndex = this.pages.findIndex(page => page.title.toLowerCase() === path.toLowerCase());
    }
  }

}
