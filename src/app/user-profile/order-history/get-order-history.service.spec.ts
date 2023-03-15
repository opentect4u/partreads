import { TestBed } from '@angular/core/testing';

import { GetOrderHistoryService } from './get-order-history.service';

describe('GetOrderHistoryService', () => {
  let service: GetOrderHistoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetOrderHistoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
