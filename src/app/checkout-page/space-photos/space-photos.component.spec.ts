import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpacePhotosComponent } from './space-photos.component';

describe('SpacePhotosComponent', () => {
  let component: SpacePhotosComponent;
  let fixture: ComponentFixture<SpacePhotosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpacePhotosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpacePhotosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
