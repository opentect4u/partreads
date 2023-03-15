import { TestBed } from '@angular/core/testing';

import { SplitbookService } from './splitbook.service';

describe('SplitbookService', () => {
  let service: SplitbookService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SplitbookService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
