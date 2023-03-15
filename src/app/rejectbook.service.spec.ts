import { TestBed } from '@angular/core/testing';

import { RejectbookService } from './rejectbook.service';

describe('RejectbookService', () => {
  let service: RejectbookService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RejectbookService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
