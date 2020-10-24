import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule } from '@ionic/angular';

import { BigButtonComponent } from './big-button.component';

describe('BigButtonComponent', () => {
  let component: BigButtonComponent;
  let fixture: ComponentFixture<BigButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BigButtonComponent],
      imports: [
        IonicModule.forRoot(),
        RouterTestingModule.withRoutes([]),
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(BigButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
