import { TestBed } from '@angular/core/testing';

import { RatingManageService } from './rating-manage.service';

describe('RatingManageService', () => {
  let service: RatingManageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RatingManageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
