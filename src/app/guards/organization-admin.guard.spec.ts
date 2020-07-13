import { TestBed } from '@angular/core/testing';

import { OrganizationAdminGuard } from './organization-admin.guard';

describe('OrganizationAdminGuard', () => {
  let guard: OrganizationAdminGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(OrganizationAdminGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
