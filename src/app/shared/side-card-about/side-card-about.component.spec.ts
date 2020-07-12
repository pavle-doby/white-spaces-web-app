import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SideCardAboutComponent } from './side-card-about.component';

describe('SideCardAboutComponent', () => {
  let component: SideCardAboutComponent;
  let fixture: ComponentFixture<SideCardAboutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SideCardAboutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SideCardAboutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
