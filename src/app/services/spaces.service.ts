import { Injectable } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { AppSpace } from '../models/space';
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

  public items$ = new BehaviorSubject<AppSpace[]>([]);

  constructor(private auth: AuthService) {
    const items: AppSpace[] = [
      {
        title: 'Espacio A',
        chats: ['Chat 1A', 'Chat 2A']
      },
      {
        title: 'Espacio B',
        chats: ['Chat 1B', 'Chat 2B']
      },
    ];
    this.items$.next(items);
  }

  enabled = () => this.auth.isVerified();

}
