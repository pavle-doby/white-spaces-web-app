import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckoutMessagePageComponent } from './checkout-message-page.component';

describe('CheckoutMessagePageComponent', () => {
  let component: CheckoutMessagePageComponent;
  let fixture: ComponentFixture<CheckoutMessagePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckoutMessagePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckoutMessagePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
