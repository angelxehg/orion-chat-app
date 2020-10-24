import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { TomatoeContactGroup } from '../models/contact';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {

  private items: TomatoeContactGroup[] = [];
  private items$ = new Subject<TomatoeContactGroup[]>();

  public observable = this.items$.asObservable();

  constructor() { }

  mock() {
    this.items = [
      {
        title: 'Mis contactos',
        items: [
          {
            title: 'Contacto 1'
          },
          {
            title: 'Contacto 2'
          },
          {
            title: 'Contacto 3'
          },
          {
            title: 'Contacto 4'
          },
          {
            title: 'Contacto 5'
          }
        ]
      }
    ];
    this.items$.next(this.items);
  }
}
