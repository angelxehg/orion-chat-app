import { Injectable } from '@angular/core';
import { of, Subject } from 'rxjs';
import { TomatoeDocumentGroup } from '../models/document';

export const FilesServiceMock = {
  observable: of([]),
  mock: () => { },
};

@Injectable({
  providedIn: 'root'
})
export class FilesService {

  private items: TomatoeDocumentGroup[] = [];
  private items$ = new Subject<TomatoeDocumentGroup[]>();

  public observable = this.items$.asObservable();

  constructor() { }

  mock() {
    this.items = [
      {
        title: 'Mis archivos',
        items: [
          {
            title: 'Archivo 1'
          },
          {
            title: 'Archivo 2'
          },
          {
            title: 'Archivo 3'
          },
          {
            title: 'Archivo 4'
          },
          {
            title: 'Archivo 5'
          }
        ]
      }
    ];
    this.items$.next(this.items);
  }
}
