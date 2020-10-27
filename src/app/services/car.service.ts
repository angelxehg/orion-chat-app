import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { TomatoeItem } from '../models/item';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  // Los elementos deben contener las propiedades de la Interface TomatoeItem
  // Si requieres distintas propiedades puedes generar una nueva interface en /models
  // Asegurate de usar esa interface tanto en el servicio como en los componentes
  private items: TomatoeItem[] = [];
  private items$ = new Subject<TomatoeItem[]>();

  public observable = this.items$.asObservable();

  constructor(private auth: AuthService) { }

  enabled = () => this.auth.isVerified();

  mock() {
    this.items = [
      {
        title: 'Auto 1',
        content: 'Marca Modelo del Auto'
      },
      {
        title: 'Auto 2',
        content: 'Marca Modelo del Auto'
      },
      {
        title: 'Auto 3',
        content: 'Marca Modelo del Auto'
      },
      {
        title: 'Auto 4',
        content: 'Marca Modelo del Auto'
      },
      {
        title: 'Auto 5',
        content: 'Marca Modelo del Auto'
      }
    ];
    this.items$.next(this.items);
  }
}
