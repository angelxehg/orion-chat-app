import { Injectable } from '@angular/core';
import { of, Subject } from 'rxjs';
import { TomatoeContactGroup } from '../models/contact';
import { TomatoeEventGroup } from '../models/event';
import { AuthService } from './auth.service';

export const EventsServiceMock = {
  observable: of([]),
  mock: () => { },
  enabled: () => true
};

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  private items: TomatoeEventGroup[] = [];
  private items$ = new Subject<TomatoeContactGroup[]>();

  public observable = this.items$.asObservable();

  constructor(private auth: AuthService) { }

  enabled = () => this.auth.isVerified();

  mock() {
    this.items = [
      {
        title: 'Mis eventos',
        items: [
          {
            title: 'Evento 1'
          },
          {
            title: 'Evento 2'
          },
          {
            title: 'Evento 3'
          },
          {
            title: 'Evento 4'
          },
          {
            title: 'Evento 5'
          }
        ]
      }
    ];
    this.items$.next(this.items);
  }
}
