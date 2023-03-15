import { TestBed } from '@angular/core/testing';

import { AllbooksearchService } from './allbooksearch.service';

describe('AllbooksearchService', () => {
  let service: AllbooksearchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AllbooksearchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
