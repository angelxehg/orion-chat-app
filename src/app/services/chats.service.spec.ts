import { TestBed } from '@angular/core/testing';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService, AuthServiceMock } from './auth.service';

import { AngularFirestoreMock, ChatsService } from './chats.service';

describe('ChatsService', () => {
  let service: ChatsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: AuthService, useValue: AuthServiceMock },
        { provide: AngularFirestore, useValue: AngularFirestoreMock }
      ]
    });
    service = TestBed.inject(ChatsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
