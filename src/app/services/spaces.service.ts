import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { BehaviorSubject, of, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { AppChat } from '../models/chat';
import { AppSpace, DBSpaceGroup, transformSpaces } from '../models/space';
import { AppUser, AuthService } from './auth.service';

export const SpacesServiceMock = {
  observable: of([]),
  mock: () => { },
  enabled: () => true
};

@Injectable({
  providedIn: 'root'
})
export class SpacesService {

  private user: AppUser;

  private collection: AngularFirestoreCollection<DBSpaceGroup>;

  private subscription: Subscription;

  public items$ = new BehaviorSubject<AppSpace[]>([]);

  constructor(
    private auth: AuthService,
    private firestore: AngularFirestore,
  ) {
    this.auth.currentUser.subscribe(user => {
      if (user) {
        this.user = user;
        this.collection = this.firestore.collection<DBSpaceGroup>('spaces');
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
    const obs = this.collection.doc<DBSpaceGroup>(this.user.uid).valueChanges().pipe(
      map(dbSpaceGroup => transformSpaces(dbSpaceGroup))
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
