import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewAndPayComponent } from './review-and-pay.component';

describe('ReviewAndPayComponent', () => {
  let component: ReviewAndPayComponent;
  let fixture: ComponentFixture<ReviewAndPayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReviewAndPayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewAndPayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
