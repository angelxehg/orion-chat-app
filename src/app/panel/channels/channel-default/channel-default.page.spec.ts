import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ChannelDefaultPage } from './channel-default.page';

describe('ChannelDefaultPage', () => {
  let component: ChannelDefaultPage;
  let fixture: ComponentFixture<ChannelDefaultPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChannelDefaultPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ChannelDefaultPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
