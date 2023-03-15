import { TestBed } from '@angular/core/testing';

import { UserbookdetailsService } from './userbookdetails.service';

describe('UserbookdetailsService', () => {
  let service: UserbookdetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserbookdetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
