import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { WorkspaceListPage } from './workspace-list.page';

describe('WorkspaceListPage', () => {
  let component: WorkspaceListPage;
  let fixture: ComponentFixture<WorkspaceListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkspaceListPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(WorkspaceListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
