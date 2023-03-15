import { TestBed } from '@angular/core/testing';

import { BuysharedpagesService } from './buysharedpages.service';

describe('BuysharedpagesService', () => {
  let service: BuysharedpagesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BuysharedpagesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
