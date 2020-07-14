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

  constructor(
    public panel: PanelService,
    private theme: ThemeService
  ) {
    this.theme.load();
  }

  ngOnInit() { }

}
