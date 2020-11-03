import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { BehaviorSubject, of, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { AppChat, DBChat, transformChat } from 'src/app/models/new/chats';
import { AuthService } from './auth.service';

export const ChatServiceMock = {
  items$: of([]),
};

@Injectable({
  providedIn: 'root'
})
export class ChatsService {

  private user: firebase.User;

  private collection: AngularFirestoreCollection<DBChat>;

  private subscription: Subscription;

  public items$ = new BehaviorSubject<AppChat[]>([]);

  constructor(
    private auth: AuthService,
    private firestore: AngularFirestore,
  ) {
    this.auth.authState.subscribe(user => {
      if (user) {
        this.user = user;
        this.collection = this.firestore.collection<DBChat>('chats',
          q => q.where('participants', 'array-contains', this.user.uid)
        );
        this.items$.next([]);
      } else {
        if (this.subscription) {
          this.subscription.unsubscribe();
        }
        this.user = null;
        this.collection = null;
        this.items$.next([]);
      }
    });
  }

  public enabled = () => this.auth.isVerified();

  public subscribe() {
    if (!this.user) {
      return null;
    }
    const obs = this.collection.valueChanges({ idField: 'id' }).pipe(
      map(dbChats => dbChats.map(
        chat => transformChat(chat, this.user.uid)
      ))
    );
    this.subscription = obs.subscribe(elements => {
      this.items$.next(elements);
    });
    return this.subscription;
  }

  public unsubscribe() {
    this.subscription.unsubscribe();
  }

  public sendMessage(chatId: string, message: string) {
    if (!this.user) {
      return null;
    }
    const chat = this.collection.doc<DBChat>(chatId).ref;
    this.firestore.firestore.runTransaction(transaction => {
      return transaction.get(chat).then(doc => {
        if (doc.data().messages) {
          const messages = doc.data().messages;
          const newMessage = { from: this.user.uid, content: message };
          messages.push(newMessage);
          transaction.update(chat, { messages });
        }
      });
    }).then();
  }
}
