import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FloorPalnUploadComponent } from './floor-paln-upload.component';

describe('FloorPalnUploadComponent', () => {
  let component: FloorPalnUploadComponent;
  let fixture: ComponentFixture<FloorPalnUploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FloorPalnUploadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FloorPalnUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
