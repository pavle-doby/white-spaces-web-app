import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotifySnackBarComponent } from './notify-snack-bar.component';

describe('NotifySnackBarComponent', () => {
  let component: NotifySnackBarComponent;
  let fixture: ComponentFixture<NotifySnackBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotifySnackBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotifySnackBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
