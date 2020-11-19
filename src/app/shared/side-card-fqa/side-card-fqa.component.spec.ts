import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SideCardFqaComponent } from './side-card-fqa.component';

describe('SideCardFqaComponent', () => {
  let component: SideCardFqaComponent;
  let fixture: ComponentFixture<SideCardFqaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SideCardFqaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SideCardFqaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
