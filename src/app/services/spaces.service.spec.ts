import { TestBed } from '@angular/core/testing';
import { AuthService, AuthServiceMock } from './auth.service';

import { SpacesService } from './spaces.service';

describe('SpacesService', () => {
  let service: SpacesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: AuthService, useValue: AuthServiceMock },
      ]
    });
    service = TestBed.inject(SpacesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
