import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FriendCreatePage } from './friend-create.page';

describe('FriendCreatePage', () => {
  let component: FriendCreatePage;
  let fixture: ComponentFixture<FriendCreatePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FriendCreatePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FriendCreatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
