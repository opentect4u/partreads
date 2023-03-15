import { TestBed } from '@angular/core/testing';

import { AdminorderhistoryserveService } from './adminorderhistoryserve.service';

describe('AdminorderhistoryserveService', () => {
  let service: AdminorderhistoryserveService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminorderhistoryserveService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
