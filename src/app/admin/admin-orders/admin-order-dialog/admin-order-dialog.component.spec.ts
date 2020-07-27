import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminOrderDialogComponent } from './admin-order-dialog.component';

describe('AdminOrderDialogComponent', () => {
  let component: AdminOrderDialogComponent;
  let fixture: ComponentFixture<AdminOrderDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AdminOrderDialogComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminOrderDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
