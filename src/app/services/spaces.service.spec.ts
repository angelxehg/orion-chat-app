import { TestBed } from '@angular/core/testing';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService, AuthServiceMock } from './auth.service';
import { AngularFirestoreMock } from './chats.service';

import { SpacesService } from './spaces.service';

describe('SpacesService', () => {
  let service: SpacesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: AuthService, useValue: AuthServiceMock },
        { provide: AngularFirestore, useValue: AngularFirestoreMock }
      ]
    });
    service = TestBed.inject(SpacesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
