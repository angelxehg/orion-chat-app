import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { TomatoeItem } from '../models/item';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  // Se traen los elementos de la colección 'cars'. Estos se actualizan en tiempo real
  // Los elementos deben contener las propiedades de la Interface TomatoeItem
  // Si requieres distintas propiedades puedes generar una nueva interface en /models
  // Asegurate de usar esa interface tanto en el servicio como en los componentes
  private collection: AngularFirestoreCollection<TomatoeItem>;

  public items: Observable<TomatoeItem[]>;

  constructor(private auth: AuthService, private firestore: AngularFirestore) {
    this.collection = this.firestore.collection<TomatoeItem>('cars');
    // Esta es la instrucción que hace la magia de actualizar automáticamente
    this.items = this.collection.valueChanges({ idField: 'id' });
  }

  document(id: string) {
    return this.firestore.doc<TomatoeItem>(`cars/${id}`).valueChanges().pipe(take(1));
  }

  enabled = () => this.auth.isVerified();
}
