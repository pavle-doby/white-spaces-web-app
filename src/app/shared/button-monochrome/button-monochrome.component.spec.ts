import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonMonochromeComponent } from './button-monochrome.component';

describe('ButtonMonochromeComponent', () => {
  let component: ButtonMonochromeComponent;
  let fixture: ComponentFixture<ButtonMonochromeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ButtonMonochromeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonMonochromeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
