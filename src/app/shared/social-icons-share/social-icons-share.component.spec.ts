import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SocialIconsShareComponent } from './social-icons-share.component';

describe('SocialIconsShareComponent', () => {
  let component: SocialIconsShareComponent;
  let fixture: ComponentFixture<SocialIconsShareComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SocialIconsShareComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SocialIconsShareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
