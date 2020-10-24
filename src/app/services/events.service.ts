import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { TomatoeContactGroup } from '../models/contact';
import { TomatoeEventGroup } from '../models/event';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  private items: TomatoeEventGroup[] = [];
  private items$ = new Subject<TomatoeContactGroup[]>();

  public observable = this.items$.asObservable();

  constructor() { }

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
