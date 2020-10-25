import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { SpacesService, SpacesServiceMock } from 'src/app/services/spaces.service';

import { SpacesPage } from './spaces.page';

describe('SpacesPage', () => {
  let component: SpacesPage;
  let fixture: ComponentFixture<SpacesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SpacesPage],
      imports: [IonicModule.forRoot()],
      providers: [
        { provide: SpacesService, useValue: SpacesServiceMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SpacesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
