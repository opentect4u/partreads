import { TestBed } from '@angular/core/testing';

import { BuynowInitService } from './buynow-init.service';

describe('BuynowInitService', () => {
  let service: BuynowInitService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BuynowInitService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
