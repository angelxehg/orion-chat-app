import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { WorkspaceDefaultPage } from './workspace-default.page';

describe('WorkspaceDefaultPage', () => {
  let component: WorkspaceDefaultPage;
  let fixture: ComponentFixture<WorkspaceDefaultPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [WorkspaceDefaultPage],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(WorkspaceDefaultPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
