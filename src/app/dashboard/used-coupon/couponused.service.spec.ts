import { TestBed } from '@angular/core/testing';

import { CouponusedService } from './couponused.service';

describe('CouponusedService', () => {
  let service: CouponusedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CouponusedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
