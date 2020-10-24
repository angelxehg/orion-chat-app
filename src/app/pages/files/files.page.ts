import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { TomatoeDocumentGroup } from 'src/app/models/document';
import { FilesService } from 'src/app/services/files.service';

@Component({
  selector: 'app-files',
  templateUrl: './files.page.html',
  styleUrls: ['./files.page.scss'],
})
export class FilesPage {

  items: Observable<TomatoeDocumentGroup[]> = this.files.observable;

  constructor(private files: FilesService) { }

  ionViewWillEnter() {
    this.files.mock();
  }
}
