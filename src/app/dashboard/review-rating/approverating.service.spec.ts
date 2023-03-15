import { TestBed } from '@angular/core/testing';

import { ApproveratingService } from './approverating.service';

describe('ApproveratingService', () => {
  let service: ApproveratingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApproveratingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
