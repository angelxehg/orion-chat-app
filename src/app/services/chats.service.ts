import { Injectable } from '@angular/core';
import { of, Subject } from 'rxjs';
import { TomatoeChatGroup } from '../models/chat';

export const ChatServiceMock = {
  observable: of([]),
  mock: () => { },
};

@Injectable({
  providedIn: 'root'
})
export class ChatsService {

  private items: TomatoeChatGroup[] = [];
  private items$ = new Subject<TomatoeChatGroup[]>();

  public observable = this.items$.asObservable();

  constructor() { }

  mock() {
    this.items = [
      {
        title: 'Mis conversaciones',
        items: [
          {
            title: 'Conversación 1',
            lastMsg: '[Yo]: Hola',
            lastMsgDate: '19:00'
          },
          {
            title: 'Conversación 2',
            lastMsg: '[Yo]: Hola',
            lastMsgDate: '20:15'
          },
          {
            title: 'Conversación 3',
            lastMsg: '[Yo]: Hola',
            lastMsgDate: '15:30'
          },
          {
            title: 'Conversación 4',
            lastMsg: '[Yo]: Hola',
            lastMsgDate: '21:10'
          },
          {
            title: 'Conversación 5',
            lastMsg: '[Yo]: Hola',
            lastMsgDate: '19:30'
          }
        ]
      }
    ];
    this.items$.next(this.items);
  }
}
