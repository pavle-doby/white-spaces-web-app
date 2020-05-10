import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YouGetComponent } from './you-get.component';

describe('YouGetComponent', () => {
  let component: YouGetComponent;
  let fixture: ComponentFixture<YouGetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YouGetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YouGetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
