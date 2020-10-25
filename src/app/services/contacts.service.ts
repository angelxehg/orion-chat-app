import { Injectable } from '@angular/core';
import { of, Subject } from 'rxjs';
import { TomatoeContactGroup } from '../models/contact';
import { AuthService } from './auth.service';

export const ContactsServiceMock = {
  observable: of([]),
  mock: () => { },
  enabled: () => true
};

@Injectable({
  providedIn: 'root'
})
export class ContactsService {

  private items: TomatoeContactGroup[] = [];
  private items$ = new Subject<TomatoeContactGroup[]>();

  public observable = this.items$.asObservable();

  constructor(private auth: AuthService) { }

  enabled = () => this.auth.isVerified();

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
