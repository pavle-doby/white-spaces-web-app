import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpeningLabelComponent } from './opening-label.component';

describe('OpeningLabelComponent', () => {
  let component: OpeningLabelComponent;
  let fixture: ComponentFixture<OpeningLabelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpeningLabelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpeningLabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
