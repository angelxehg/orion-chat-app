import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { BehaviorSubject, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { AppChat, DBChat, transformChat } from 'src/app/models/new/chats';

@Injectable({
  providedIn: 'root'
})
export class ChatsService {

  private user: firebase.User;

  private collection: AngularFirestoreCollection<DBChat>;

  private subscription: Subscription;

  public items$ = new BehaviorSubject<AppChat[]>([]);

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
        this.items$.next([]);
      } else {
        this.user = null;
        this.collection = null;
        this.items$.next([]);
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
    const obs = this.collection.valueChanges({ idField: 'id' }).pipe(
      map(dbChats => dbChats.map(
        chat => transformChat(chat, this.uid())
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
}
