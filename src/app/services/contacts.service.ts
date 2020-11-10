import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { of, BehaviorSubject, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { AppContact, DBContactGroup } from '../models/contact';
import { AppUser, AuthService } from './auth.service';

export const ContactsServiceMock = {
  observable: of([]),
  mock: () => { },
  enabled: () => true
};

@Injectable({
  providedIn: 'root'
})
export class ContactsService {

  private user: AppUser;

  private collection: AngularFirestoreCollection<DBContactGroup>;

  private subscription: Subscription;

  public items$ = new BehaviorSubject<AppContact[]>([]);

  constructor(
    private auth: AuthService,
    private firestore: AngularFirestore,
  ) {
    this.auth.currentUser.subscribe(user => {
      if (user) {
        this.user = user;
        this.collection = this.firestore.collection<DBContactGroup>('contacts');
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

  enabled = () => this.auth.isVerified();

  public subscribe() {
    if (!this.user) {
      return null;
    }
    const obs = this.collection.doc<DBContactGroup>(this.user.uid).valueChanges().pipe(
      map(dbContacts => dbContacts.contacts)
    );
    this.subscription = obs.subscribe(elements => {
      this.items$.next(elements);
    });
    return this.subscription;
  }

  public unsubscribe() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
