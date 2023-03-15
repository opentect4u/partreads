import { TestBed } from '@angular/core/testing';

import { UserlogoutService } from './userlogout.service';

describe('UserlogoutService', () => {
  let service: UserlogoutService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserlogoutService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
