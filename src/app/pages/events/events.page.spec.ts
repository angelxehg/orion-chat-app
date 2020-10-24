import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { EventsService, EventsServiceMock } from 'src/app/services/events.service';

import { EventsPage } from './events.page';

describe('EventsPage', () => {
  let component: EventsPage;
  let fixture: ComponentFixture<EventsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EventsPage],
      imports: [IonicModule.forRoot()],
      providers: [
        { provide: EventsService, useValue: EventsServiceMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(EventsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
