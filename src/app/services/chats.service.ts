import { Injectable } from '@angular/core';
import { of, Subject } from 'rxjs';
import { TomatoeChat } from '../models/chat';
import { AuthService } from './auth.service';

export const ChatServiceMock = {
  observable: of([]),
  mock: () => { },
};

@Injectable({
  providedIn: 'root'
})
export class ChatsService {

  private items: TomatoeChat[] = [];
  private items$ = new Subject<TomatoeChat[]>();

  public observable = this.items$.asObservable();

  constructor(private auth: AuthService) {
    this.mock();
  }

  enabled = () => this.auth.userData.emailVerified;

  create() {
    this.items.push({
      title: 'Conversación X',
      lastMsg: '[Yo]: Hola',
      lastMsgDate: '19:00'
    });
    this.items$.next(this.items);
  }

  mock() {
    this.items = [
      {
        title: 'Conversación 1',
        lastMsg: '[Yo]: Hola',
        lastMsgDate: '19:00',
        imageSrc: 'https://ionicframework.com/docs/demos/api/list/avatar-finn.png'
      },
      {
        title: 'Conversación 2',
        lastMsg: '[Yo]: Hola',
        lastMsgDate: '20:15',
        imageSrc: 'https://ionicframework.com/docs/demos/api/list/avatar-han.png'
      },
      {
        title: 'Conversación 3',
        lastMsg: '[Yo]: Hola',
        lastMsgDate: '15:30',
        imageSrc: 'https://ionicframework.com/docs/demos/api/list/avatar-luke.png'
      }
    ];
    this.items$.next(this.items);
  }
}
