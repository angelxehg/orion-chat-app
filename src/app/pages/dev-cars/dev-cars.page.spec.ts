import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DevCarsPage } from './dev-cars.page';

describe('DevCarsPage', () => {
  let component: DevCarsPage;
  let fixture: ComponentFixture<DevCarsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DevCarsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DevCarsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
