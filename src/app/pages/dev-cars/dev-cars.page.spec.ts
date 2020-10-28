import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule } from '@ionic/angular';
import { CarService, CarServiceMock } from 'src/app/services/car.service';

import { DevCarsPage } from './dev-cars.page';

describe('DevCarsPage', () => {
  let component: DevCarsPage;
  let fixture: ComponentFixture<DevCarsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DevCarsPage],
      imports: [
        IonicModule.forRoot(),
        RouterTestingModule.withRoutes([]),
      ],
      providers: [
        { provide: CarService, useValue: CarServiceMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DevCarsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
