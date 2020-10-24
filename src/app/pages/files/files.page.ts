import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { TomatoeDocumentGroup } from 'src/app/models/document';
import { FilesService } from 'src/app/services/files.service';
import { PanelService } from '../../services/panel.service';

@Component({
  selector: 'app-files',
  templateUrl: './files.page.html',
  styleUrls: ['./files.page.scss'],
})
export class FilesPage {

  items: Observable<TomatoeDocumentGroup[]> = this.files.observable;

  constructor(private files: FilesService, public panel: PanelService) { }

  ionViewWillEnter() {
    this.panel.show();
    this.files.mock();
  }
}
