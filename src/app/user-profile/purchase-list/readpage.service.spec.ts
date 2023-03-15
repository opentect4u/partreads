import { TestBed } from '@angular/core/testing';

import { ReadpageService } from './readpage.service';

describe('ReadpageService', () => {
  let service: ReadpageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReadpageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
