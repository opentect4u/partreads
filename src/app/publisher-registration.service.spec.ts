import { TestBed } from '@angular/core/testing';

import { PublisherRegistrationService } from './publisher-registration.service';

describe('PublisherRegistrationService', () => {
  let service: PublisherRegistrationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PublisherRegistrationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
