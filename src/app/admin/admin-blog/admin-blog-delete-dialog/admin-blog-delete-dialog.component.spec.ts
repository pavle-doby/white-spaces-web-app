import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminBlogDeleteDialogComponent } from './admin-blog-delete-dialog.component';

describe('AdminBlogDeleteDialogComponent', () => {
  let component: AdminBlogDeleteDialogComponent;
  let fixture: ComponentFixture<AdminBlogDeleteDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminBlogDeleteDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminBlogDeleteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
