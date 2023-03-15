import { TestBed } from '@angular/core/testing';

import { UlogService } from './ulog.service';

describe('UlogService', () => {
  let service: UlogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UlogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
