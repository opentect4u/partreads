import { TestBed } from '@angular/core/testing';

import { CatserveService } from './catserve.service';

describe('CatserveService', () => {
  let service: CatserveService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CatserveService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
