import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AlertController } from '@ionic/angular';
import { BehaviorSubject, of, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { AppChat, DBChat, transformChat } from 'src/app/models/chat';
import { AppUser, AuthService } from './auth.service';
import { ContactsService } from './contacts.service';
import { ToastService } from './toast.service';

export const AngularFirestoreMock = {};

export const ChatServiceMock = {
  items$: of([]),
};

@Injectable({
  providedIn: 'root'
})
export class ChatsService {

  private user: AppUser;

  private collection: AngularFirestoreCollection<DBChat>;

  private subscription: Subscription;

  public items$ = new BehaviorSubject<AppChat[]>([]);

  constructor(
    private auth: AuthService,
    private alert: AlertController,
    private contacts: ContactsService,
    private firestore: AngularFirestore,
    private toast: ToastService
  ) {
    this.auth.currentUser.subscribe(user => {
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

  public create() {
    if (!this.user) {
      return;
    }
    this.alert.create({
      header: 'Crear nuevo chat',
      subHeader: 'Ingresa los datos del chat',
      inputs: [
        {
          name: 'name',
          type: 'text',
          placeholder: 'Nombre del chat'
        },
        {
          name: 'emails',
          type: 'text',
          placeholder: 'Integrantes (emails, separados por comas)'
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
          handler: ({ name, emails }) => {
            const contactEmails: any[] = emails.replace(/\s/g, '').split(',');
            const participants = this.contacts.items$.value
              .filter(i => contactEmails.includes(i.email))
              .map(i => i.uid);
            participants.push(this.user.uid);
            const chat: DBChat = {
              title: name,
              messages: [],
              participants
            };
            this.collection.add(chat).then(() => {
              this.toast.success('Chat creado');
            });
          }
        }
      ]
    }).then(a => a.present());
  }

  public subscribe() {
    if (!this.user) {
      return null;
    }
    const obs = this.collection.valueChanges({ idField: 'id' }).pipe(
      map(dbChats => dbChats.map(
        chat => transformChat(chat, this.user.uid)
      )),
      map(chats => {
        const contacts = this.contacts.items$.value;
        return chats.map(chat => {
          const participants = contacts.filter(i => chat.participants.includes(i.uid));
          const messages = chat.messages.map(msg => {
            const contactName = participants.find(i => i.uid === msg.from);
            if (contactName) {
              msg.name = contactName.name || '';
            }
            return msg;
          });
          chat.messages = messages;
          chat.participantsRich = participants;
          return chat;
        });
      })
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
