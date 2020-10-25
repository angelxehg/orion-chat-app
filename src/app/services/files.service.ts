import { Injectable } from '@angular/core';
import { of, Subject } from 'rxjs';
import { TomatoeDocumentGroup } from '../models/document';
import { AuthService } from './auth.service';

export const FilesServiceMock = {
  observable: of([]),
  mock: () => { },
  enabled: () => true
};

@Injectable({
  providedIn: 'root'
})
export class FilesService {

  private items: TomatoeDocumentGroup[] = [];
  private items$ = new Subject<TomatoeDocumentGroup[]>();

  public observable = this.items$.asObservable();

  constructor(private auth: AuthService) { }

  enabled = () => this.auth.isVerified();

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
