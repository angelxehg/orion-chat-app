import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { take } from 'rxjs/operators';
import { TomatoeItem } from '../models/item';
import { AuthService } from './auth.service';
import { ToastService } from './toast.service';

export const CarServiceMock = {
  index: () => of([]),
  show: (id: string) => of({}),
  create: () => { },
  update: () => { },
  delete: () => { },
  enabled: () => true
};

@Injectable({
  providedIn: 'root'
})
export class CarService {

  // Se traen los elementos de la colección 'cars'. Estos se actualizan en tiempo real
  // Los elementos deben contener las propiedades de la Interface TomatoeItem
  // Si requieres distintas propiedades puedes generar una nueva interface en /models
  // Asegurate de usar esa interface tanto en el servicio como en los componentes
  private collection: AngularFirestoreCollection<TomatoeItem>;
  private userID = '';

  public items: Observable<TomatoeItem[]>;

  constructor(
    private auth: AuthService,
    private firestore: AngularFirestore,
    private toast: ToastService
  ) {
    this.auth.authState.subscribe(user => {
      if (user) {
        console.log('There\'s a user');
        this.userID = user.uid;
        this.collection = this.firestore.collection<TomatoeItem>('cars',
          q => q.where('user', '==', this.userID)
        );
      } else {
        this.userID = '';
        this.collection = null;
      }
    });
  }

  public index() {
    if (!this.collection) {
      return of([]);
    }
    return this.collection.valueChanges({ idField: 'id' });
  }

  public show(id: string) {
    return this.collection.doc<TomatoeItem>(id).valueChanges().pipe(take(1));
  }

  public create(item: TomatoeItem) {
    item.user = this.userID;
    return this.collection.add(item).then(() => {
      this.toast.success('Documento creado');
    }).catch(err => {
      console.log(err);
      this.toast.error('No se pudo crear documento');
    });
  }

  public update(id: string, item: TomatoeItem) {
    const document = this.collection.doc<TomatoeItem>(id);
    return document.update(item).then(() => {
      this.toast.success('Documento actualizado');
    }).catch(err => {
      console.log(err);
      this.toast.error('No se pudo actualizar documento');
    });
  }

  public delete(id: string) {
    const document = this.collection.doc<TomatoeItem>(id);
    return document.delete().then(() => {
      this.toast.success('Documento eliminado');
    }).catch(err => {
      console.log(err);
      this.toast.error('No se pudo eliminar documento');
    });
  }

  enabled = () => this.auth.isVerified();
}
