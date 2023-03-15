import { TestBed } from '@angular/core/testing';

import { AutosearchService } from './autosearch.service';

describe('AutosearchService', () => {
  let service: AutosearchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AutosearchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
