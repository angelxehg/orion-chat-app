import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { ChatsService } from 'src/app/services/chats.service';
import { ChatServiceMock } from 'src/app/services/spaces.service';

import { ChatMenuComponent } from './chat-menu.component';

describe('ChatMenuComponent', () => {
  let component: ChatMenuComponent;
  let fixture: ComponentFixture<ChatMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ChatMenuComponent],
      imports: [IonicModule.forRoot()],
      providers: [
        { provide: ChatsService, useValue: ChatServiceMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ChatMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
