import { Component } from '@angular/core';
import { TomatoeDocumentGroup } from 'src/app/models/document';
import { PanelService } from '../../services/panel.service';

@Component({
  selector: 'app-files',
  templateUrl: './files.page.html',
  styleUrls: ['./files.page.scss'],
})
export class FilesPage {

  itemGroups: TomatoeDocumentGroup[] = [
    {
      title: 'Grupo 1',
      items: [
        {
          title: 'Documento 1'
        },
        {
          title: 'Documento 2'
        },
        {
          title: 'Documento 3'
        }
      ]
    }
  ];

  constructor(public panel: PanelService) { }

  ionViewWillEnter() {
    this.panel.show();
  }
}
