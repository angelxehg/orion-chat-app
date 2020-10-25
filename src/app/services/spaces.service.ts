import { Injectable } from '@angular/core';
import { of, Subject } from 'rxjs';
import { TomatoeSpaceGroup } from '../models/space';
import { AuthService } from './auth.service';

export const SpacesServiceMock = {
  observable: of([]),
  mock: () => { },
  enabled: () => true
};

@Injectable({
  providedIn: 'root'
})
export class SpacesService {

  private items: TomatoeSpaceGroup[] = [];
  private items$ = new Subject<TomatoeSpaceGroup[]>();

  public observable = this.items$.asObservable();

  constructor(private auth: AuthService) { }

  enabled = () => this.auth.isVerified();

  mock() {
    this.items = [
      {
        title: 'Mis espacios',
        items: [
          {
            title: 'Espacio 1'
          },
          {
            title: 'Espacio 2'
          },
          {
            title: 'Espacio 3'
          },
          {
            title: 'Espacio 4'
          },
          {
            title: 'Espacio 5'
          }
        ]
      }
    ];
    this.items$.next(this.items);
  }
}
