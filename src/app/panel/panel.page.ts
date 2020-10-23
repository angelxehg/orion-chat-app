import { Component, OnInit } from '@angular/core';
import { PanelService } from '../services/panel.service';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.page.html',
  styleUrls: ['./panel.page.scss'],
})
export class PanelPage implements OnInit {

  public selectedIndex = 0;

  constructor(public panel: PanelService) { }

  ngOnInit() { }

}
