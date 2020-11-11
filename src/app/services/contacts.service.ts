import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AlertController } from '@ionic/angular';
import { of, BehaviorSubject, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { AppContact, DBContactGroup } from '../models/contact';
import { AppProfile, AppUser, AuthService } from './auth.service';
import { ToastService } from './toast.service';

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
    private alert: AlertController,
    private toast: ToastService,
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

  public addContact() {
    if (!this.user) {
      return;
    }
    this.alert.create({
      header: 'Añadir contacto',
      subHeader: 'Ingresa su correo electrónico',
      inputs: [
        {
          name: 'email',
          type: 'email',
          placeholder: 'Ingresa el correo electrónico'
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'danger',
        },
        {
          text: 'Guardar',
          cssClass: 'success',
          handler: async ({ email }) => {
            const toast = await this.toast.waiting('Buscando usuario');
            const sub = this.firestore.collection<AppProfile>('profiles',
              q => q.where('email', '==', email)).valueChanges().pipe(
                map(async profiles => {
                  toast.dismiss();
                  if (profiles.length === 0) {
                    await this.toast.error('No se encontró usuario');
                  } else {
                    const profile = profiles[0];
                    if (this.items$.value.find(i => i.email === profile.email)) {
                      await this.toast.error('El usuario ya está en contactos');
                    } else {
                      const contactsRef = this.collection.doc<DBContactGroup>(this.user.uid).ref;
                      this.firestore.firestore.runTransaction(transaction => {
                        return transaction.get(contactsRef).then(doc => {
                          const contacts = doc.data().contacts;
                          if (contacts) {
                            contacts.push(profile);
                            transaction.update(contactsRef, { contacts });
                          }
                        });
                      }).then(async x => {
                        await this.toast.success('Se añadió usuario a contactos');
                      });
                    }
                  }
                  sub.unsubscribe();
                })
              ).subscribe();
          }
        }
      ]
    }).then(a => a.present());
  }

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
