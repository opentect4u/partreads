import { TestBed } from '@angular/core/testing';

import { BuynowService } from './buynow.service';

describe('BuynowService', () => {
  let service: BuynowService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BuynowService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
