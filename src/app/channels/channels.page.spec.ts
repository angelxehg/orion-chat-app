import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { ChannelsPage } from './channels.page';

describe('ChannelsPage', () => {
  let component: ChannelsPage;
  let fixture: ComponentFixture<ChannelsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ChannelsPage],
      imports: [IonicModule.forRoot(), ExploreContainerComponentModule]
    }).compileComponents();

    fixture = TestBed.createComponent(ChannelsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
