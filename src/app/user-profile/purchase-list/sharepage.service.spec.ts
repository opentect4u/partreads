import { TestBed } from '@angular/core/testing';

import { SharepageService } from './sharepage.service';

describe('SharepageService', () => {
  let service: SharepageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SharepageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
