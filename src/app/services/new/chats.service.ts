import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { BehaviorSubject, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { AppChat, chatsExample, DBChat } from 'src/app/models/new/chats';

@Injectable({
  providedIn: 'root'
})
export class ChatsService {

  private user: firebase.User;

  private collection: AngularFirestoreCollection<DBChat>;

  private subscription: Subscription;

  public items$ = new BehaviorSubject<AppChat[]>(chatsExample);

  constructor(
    private auth: AngularFireAuth,
    private firestore: AngularFirestore,
  ) {
    this.auth.authState.subscribe(user => {
      if (user) {
        this.user = user;
        this.collection = this.firestore.collection<DBChat>('chats',
          q => q.where('participants', 'array-contains', this.user.uid)
        );
      } else {
        this.user = null;
        this.collection = null;
      }
    });
  }

  private uid = () => {
    if (!this.user) {
      return '';
    }
    return this.user.uid;
  }

  public subscribe() {
    console.log('Subscribing to Chats from Firestore');
    const obs = this.collection.valueChanges({ idField: 'id' }).pipe(
      map(dbChats => {
        const appChats: AppChat[] = dbChats.map(chat => {
          return {
            id: chat.id,
            title: chat.title,
            participants: chat.participants,
            messages: chat.messages.map(message => {
              return {
                from: message.from,
                content: message.from,
                mine: this.uid() === message.from
              };
            })
          };
        });
        return appChats;
      })
    );
    this.subscription = obs.subscribe(elements => {
      this.items$.next(elements);
    });
    return this.subscription;
  }

  public unsubscribe() {
    console.log('Unsubscribing to Chats from Firestore');
    this.subscription.unsubscribe();
  }
}
