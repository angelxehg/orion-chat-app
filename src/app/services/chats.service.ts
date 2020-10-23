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
            title: 'Conversación 1'
          },
          {
            title: 'Conversación 2'
          },
          {
            title: 'Conversación 3'
          },
          {
            title: 'Conversación 4'
          },
          {
            title: 'Conversación 5'
          }
        ]
      }
    ];
    this.items$.next(this.items);
  }
}
