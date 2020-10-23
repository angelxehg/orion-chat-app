import { Component } from '@angular/core';
import { TomatoeSpaceGroup } from 'src/app/models/space';
import { PanelService } from 'src/app/services/panel.service';

@Component({
  selector: 'app-spaces',
  templateUrl: './spaces.page.html',
  styleUrls: ['./spaces.page.scss'],
})
export class SpacesPage {

  itemGroups: TomatoeSpaceGroup[] = [
    {
      title: 'Mis espacios de trabajo',
      items: [
        {
          title: 'Espacio 1'
        },
        {
          title: 'Espacio 2'
        },
        {
          title: 'Espacio 3'
        }
      ]
    }
  ];

  constructor(public panel: PanelService) { }

  ionViewWillEnter() {
    this.panel.show('spaces');
  }
}
