import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { ExploreContainerComponentModule } from '../../explore-container/explore-container.module';

import { WorkspacesPage } from './workspaces.page';

describe('WorkspacesPage', () => {
  let component: WorkspacesPage;
  let fixture: ComponentFixture<WorkspacesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [WorkspacesPage],
      imports: [IonicModule.forRoot(), ExploreContainerComponentModule]
    }).compileComponents();

    fixture = TestBed.createComponent(WorkspacesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
