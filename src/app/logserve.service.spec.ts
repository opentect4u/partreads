import { TestBed } from '@angular/core/testing';

import { LogserveService } from './logserve.service';

describe('LogserveService', () => {
  let service: LogserveService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LogserveService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
