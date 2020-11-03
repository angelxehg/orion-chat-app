import { TestBed } from '@angular/core/testing';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuthMock, AngularFirestoreMock } from 'src/app/models/mocks';

import { ChatsService } from './chats.service';

describe('ChatsService', () => {
  let service: ChatsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: AngularFireAuth, useValue: AngularFireAuthMock },
        { provide: AngularFirestore, useValue: AngularFirestoreMock }
      ]
    });
    service = TestBed.inject(ChatsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
