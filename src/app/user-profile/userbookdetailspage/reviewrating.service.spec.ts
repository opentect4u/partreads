import { TestBed } from '@angular/core/testing';

import { ReviewratingService } from './reviewrating.service';

describe('ReviewratingService', () => {
  let service: ReviewratingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReviewratingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
