import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { PanelService, PanelServiceMock } from 'src/app/services/panel.service';

import { SpacesPage } from './spaces.page';

describe('SpacesPage', () => {
  let component: SpacesPage;
  let fixture: ComponentFixture<SpacesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SpacesPage],
      imports: [IonicModule.forRoot()],
      providers: [
        { provide: PanelService, useValue: PanelServiceMock }
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
