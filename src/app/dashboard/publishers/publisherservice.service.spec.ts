import { TestBed } from '@angular/core/testing';

import { PublisherserviceService } from './publisherservice.service';

describe('PublisherserviceService', () => {
  let service: PublisherserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PublisherserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
