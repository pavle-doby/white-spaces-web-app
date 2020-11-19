import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YouGetDialogComponent } from './you-get-dialog.component';

describe('YouGetDialogComponent', () => {
  let component: YouGetDialogComponent;
  let fixture: ComponentFixture<YouGetDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YouGetDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YouGetDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
