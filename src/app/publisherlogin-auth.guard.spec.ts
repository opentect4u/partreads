import { TestBed } from '@angular/core/testing';

import { PublisherloginAuthGuard } from './publisherlogin-auth.guard';

describe('PublisherloginAuthGuard', () => {
  let guard: PublisherloginAuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(PublisherloginAuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
