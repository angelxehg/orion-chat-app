import { TestBed } from '@angular/core/testing';
import { Storage } from '@ionic/storage';

import { SettingsService, SettingsStorageMock } from './settings.service';

describe('SettingsService', () => {
  let service: SettingsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: Storage, useValue: SettingsStorageMock }
      ]
    });
    service = TestBed.inject(SettingsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
