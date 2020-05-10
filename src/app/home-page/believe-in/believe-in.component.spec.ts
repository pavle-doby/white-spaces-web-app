import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BelieveInComponent } from './believe-in.component';

describe('BelieveInComponent', () => {
  let component: BelieveInComponent;
  let fixture: ComponentFixture<BelieveInComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BelieveInComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BelieveInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
