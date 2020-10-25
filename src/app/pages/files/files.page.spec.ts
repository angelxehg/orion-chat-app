import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { FilesService, FilesServiceMock } from 'src/app/services/files.service';

import { FilesPage } from './files.page';

describe('FilesPage', () => {
  let component: FilesPage;
  let fixture: ComponentFixture<FilesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FilesPage],
      imports: [IonicModule.forRoot()],
      providers: [
        { provide: FilesService, useValue: FilesServiceMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(FilesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
