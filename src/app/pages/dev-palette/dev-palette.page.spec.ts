import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DevPalettePage } from './dev-palette.page';

describe('DevPalettePage', () => {
  let component: DevPalettePage;
  let fixture: ComponentFixture<DevPalettePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DevPalettePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DevPalettePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
