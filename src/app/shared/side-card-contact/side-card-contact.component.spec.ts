import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SideCardContactComponent } from './side-card-contact.component';

describe('SideCardContactComponent', () => {
  let component: SideCardContactComponent;
  let fixture: ComponentFixture<SideCardContactComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SideCardContactComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SideCardContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
