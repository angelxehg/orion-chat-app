import { TestBed } from '@angular/core/testing';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFirestoreMock } from '../models/mocks';
import { AuthService, AuthServiceMock } from './auth.service';

import { ChatsService } from './chats.service';

describe('ChatsService', () => {
  let service: ChatsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: AngularFirestore, useValue: AngularFirestoreMock },
        { provide: AuthService, useValue: AuthServiceMock }
      ]
    });
    service = TestBed.inject(ChatsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
