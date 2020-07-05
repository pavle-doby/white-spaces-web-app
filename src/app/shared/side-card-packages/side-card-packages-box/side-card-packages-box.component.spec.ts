import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SideCardPackagesBoxComponent } from './side-card-packages-box.component';

describe('SideCardPackagesBoxComponent', () => {
  let component: SideCardPackagesBoxComponent;
  let fixture: ComponentFixture<SideCardPackagesBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SideCardPackagesBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SideCardPackagesBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
