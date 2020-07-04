import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SideCardPackagesComponent } from './side-card-packages.component';

describe('SideCardPackagesComponent', () => {
  let component: SideCardPackagesComponent;
  let fixture: ComponentFixture<SideCardPackagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SideCardPackagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SideCardPackagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
