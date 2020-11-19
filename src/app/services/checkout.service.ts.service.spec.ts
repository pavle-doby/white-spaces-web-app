import { TestBed } from '@angular/core/testing';

import { Checkout.Service.TsService } from './checkout.service.ts.service';

describe('Checkout.Service.TsService', () => {
  let service: Checkout.Service.TsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Checkout.Service.TsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
