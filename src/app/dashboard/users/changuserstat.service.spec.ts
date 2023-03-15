import { TestBed } from '@angular/core/testing';

import { ChanguserstatService } from './changuserstat.service';

describe('ChanguserstatService', () => {
  let service: ChanguserstatService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChanguserstatService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
