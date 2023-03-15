import { TestBed } from '@angular/core/testing';

import { HardcopyserveService } from './hardcopyserve.service';

describe('HardcopyserveService', () => {
  let service: HardcopyserveService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HardcopyserveService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
