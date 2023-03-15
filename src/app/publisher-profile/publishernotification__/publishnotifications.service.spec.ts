import { TestBed } from '@angular/core/testing';

import { PublishnotificationsService } from './publishnotifications.service';

describe('PublishnotificationsService', () => {
  let service: PublishnotificationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PublishnotificationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
