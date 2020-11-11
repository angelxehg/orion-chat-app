import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ChatInfoComponent } from './chat-info.component';

describe('ChatInfoComponent', () => {
  let component: ChatInfoComponent;
  let fixture: ComponentFixture<ChatInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatInfoComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ChatInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
