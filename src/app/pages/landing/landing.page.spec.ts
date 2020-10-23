import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { AuthService, AuthServiceMock } from 'src/app/services/auth.service';
import { SettingsService, SettingsServiceMock } from 'src/app/services/settings.service';

import { LandingPage } from './landing.page';

describe('LandingPage', () => {
  let component: LandingPage;
  let fixture: ComponentFixture<LandingPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LandingPage],
      imports: [IonicModule.forRoot()],
      providers: [
        { provide: AuthService, useValue: AuthServiceMock },
        { provide: SettingsService, useValue: SettingsServiceMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LandingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
