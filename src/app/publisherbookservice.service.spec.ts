import { TestBed } from '@angular/core/testing';

import { PublisherbookserviceService } from './publisherbookservice.service';

describe('PublisherbookserviceService', () => {
  let service: PublisherbookserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PublisherbookserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
