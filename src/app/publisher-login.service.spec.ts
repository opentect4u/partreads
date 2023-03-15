import { TestBed } from '@angular/core/testing';

import { PublisherLoginService } from './publisher-login.service';

describe('PublisherLoginService', () => {
  let service: PublisherLoginService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PublisherLoginService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
