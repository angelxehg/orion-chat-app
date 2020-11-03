import { TestBed } from '@angular/core/testing';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFirestoreMock } from '../models/mocks';
import { AuthService, AuthServiceMock } from './auth.service';

import { CarService } from './car.service';

describe('CarService', () => {
  let service: CarService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: AngularFirestore, useValue: AngularFirestoreMock },
        { provide: AuthService, useValue: AuthServiceMock }
      ]
    });
    service = TestBed.inject(CarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
