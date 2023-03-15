import { TestBed } from '@angular/core/testing';

import { PurchasedbooksService } from './purchasedbooks.service';

describe('PurchasedbooksService', () => {
  let service: PurchasedbooksService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PurchasedbooksService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
