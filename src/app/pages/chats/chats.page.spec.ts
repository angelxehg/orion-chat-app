import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { ChatServiceMock, ChatsService } from 'src/app/services/chats.service';
import { PanelService, PanelServiceMock } from 'src/app/services/panel.service';

import { ChatsPage } from './chats.page';

describe('ChatsPage', () => {
  let component: ChatsPage;
  let fixture: ComponentFixture<ChatsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ChatsPage],
      imports: [IonicModule.forRoot()],
      providers: [
        { provide: PanelService, useValue: PanelServiceMock },
        { provide: ChatsService, useValue: ChatServiceMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ChatsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
