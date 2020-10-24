import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { ContactsService, ContactsServiceMock } from 'src/app/services/contacts.service';

import { ContactsPage } from './contacts.page';

describe('ContactsPage', () => {
  let component: ContactsPage;
  let fixture: ComponentFixture<ContactsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ContactsPage],
      imports: [IonicModule.forRoot()],
      providers: [
        { provide: ContactsService, useValue: ContactsServiceMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ContactsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
