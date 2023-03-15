import { TestBed } from '@angular/core/testing';

import { PublisherLogoutServiceService } from './publisher-logout-service.service';

describe('PublisherLogoutServiceService', () => {
  let service: PublisherLogoutServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PublisherLogoutServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
