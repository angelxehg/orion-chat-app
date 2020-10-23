import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { AuthService, AuthServiceMock } from '../services/auth.service';

import { NoAuthGuard } from './no-auth.guard';

describe('NoAuthGuard', () => {
  let guard: NoAuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([]),
      ],
      providers: [
        { provide: AuthService, useValue: AuthServiceMock }
      ]
    });
    guard = TestBed.inject(NoAuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
