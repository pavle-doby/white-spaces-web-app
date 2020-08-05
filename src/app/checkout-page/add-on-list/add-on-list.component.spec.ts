import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOnListComponent } from './add-on-list.component';

describe('AddOnListComponent', () => {
  let component: AddOnListComponent;
  let fixture: ComponentFixture<AddOnListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddOnListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddOnListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
