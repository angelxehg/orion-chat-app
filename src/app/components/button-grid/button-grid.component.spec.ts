import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule } from '@ionic/angular';

import { ButtonGridComponent } from './button-grid.component';

describe('ButtonGridComponent', () => {
  let component: ButtonGridComponent;
  let fixture: ComponentFixture<ButtonGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ButtonGridComponent],
      imports: [
        IonicModule.forRoot(),
        RouterTestingModule.withRoutes([]),
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ButtonGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
