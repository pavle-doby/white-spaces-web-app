import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpacePhotosUploadComponent } from './space-photos-upload.component';

describe('SpacePhotosUploadComponent', () => {
  let component: SpacePhotosUploadComponent;
  let fixture: ComponentFixture<SpacePhotosUploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpacePhotosUploadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpacePhotosUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
