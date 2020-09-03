import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoPriceLabelComponent } from './info-price-label.component';

describe('InfoPriceLabelComponent', () => {
  let component: InfoPriceLabelComponent;
  let fixture: ComponentFixture<InfoPriceLabelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoPriceLabelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoPriceLabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
