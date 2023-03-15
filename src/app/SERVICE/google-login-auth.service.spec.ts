import { TestBed } from '@angular/core/testing';

import { GoogleLoginAuthService } from './google-login-auth.service';

describe('GoogleLoginAuthService', () => {
  let service: GoogleLoginAuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GoogleLoginAuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
