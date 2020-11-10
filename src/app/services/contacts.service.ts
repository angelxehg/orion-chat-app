import { Injectable } from '@angular/core';
import { of, BehaviorSubject } from 'rxjs';
import { AppContact } from '../models/contact';
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

  public items$ = new BehaviorSubject<AppContact[]>([]);

  constructor(private auth: AuthService) {
    const items: AppContact[] = [
      {
        name: 'Contacto X',
        email: 'x@angelxehg.com',
        uid: 'xa'
      },
      {
        name: 'Contacto Y',
        email: 'y@angelxehg.com',
        uid: 'ya'
      },
      {
        name: 'Contacto Z',
        email: 'z@angelxehg.com',
        uid: 'za'
      },
    ];
    this.items$.next(items);
  }

  enabled = () => this.auth.isVerified();

}
