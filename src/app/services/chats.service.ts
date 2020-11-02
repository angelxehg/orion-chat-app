import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable, of, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { TomatoeChat } from '../models/chat';
import { AuthService } from './auth.service';
import { ToastService } from './toast.service';

interface Chat {
  title: string;
  participants: string[];
  messages: Message[];
}

interface Message {
  from: string;
  content: string;
}

export const ChatServiceMock = {
  observable: of([]),
  mock: () => { },
  enabled: () => true
};

@Injectable({
  providedIn: 'root'
})
export class ChatsService {

  private collection: AngularFirestoreCollection<Chat>;
  private userID = '';

  public items: Observable<Chat[]>;

  constructor(
    private auth: AuthService,
    private firestore: AngularFirestore,
    private toast: ToastService
  ) {
    this.auth.authState.subscribe(user => {
      if (user) {
        console.log('There\'s a user');
        this.userID = user.uid;
        this.collection = this.firestore.collection<Chat>('chats',
          q => q.where('participants', 'array-contains', this.userID)
        );
      } else {
        this.userID = '';
        this.collection = null;
      }
    });
  }

  public index(): Observable<TomatoeChat[]> {
    if (!this.collection) {
      return of(null);
    }
    return this.collection.valueChanges({ idField: 'id' }).pipe(
      map(elements => {
        const chats: TomatoeChat[] = elements.map(e => {
          return {
            id: e.id,
            title: e.title,
            lastMsg: 'last msg',
            lastMsgDate: 'last',
            participants: e.participants,
            messages: e.messages
          };
        });
        return chats;
      })
    );
  }

  enabled = () => this.auth.isVerified();

}
