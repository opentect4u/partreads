import { TestBed } from '@angular/core/testing';

import { PubverService } from './pubver.service';

describe('PubverService', () => {
  let service: PubverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PubverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
