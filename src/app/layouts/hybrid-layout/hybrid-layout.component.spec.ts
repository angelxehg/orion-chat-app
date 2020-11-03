import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule } from '@ionic/angular';

import { HybridLayoutComponent } from './hybrid-layout.component';

describe('HybridLayoutComponent', () => {
  let component: HybridLayoutComponent;
  let fixture: ComponentFixture<HybridLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HybridLayoutComponent],
      imports: [
        IonicModule.forRoot(),
        RouterTestingModule.withRoutes([])
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HybridLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
