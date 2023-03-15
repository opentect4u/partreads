import { TestBed } from '@angular/core/testing';

import { UserbookshowService } from './userbookshow.service';

describe('UserbookshowService', () => {
  let service: UserbookshowService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserbookshowService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
