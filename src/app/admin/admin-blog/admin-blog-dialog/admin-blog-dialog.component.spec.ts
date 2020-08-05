import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminBlogDialogComponent } from './admin-blog-dialog.component';

describe('AdminBlogDialogComponent', () => {
  let component: AdminBlogDialogComponent;
  let fixture: ComponentFixture<AdminBlogDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminBlogDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminBlogDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
