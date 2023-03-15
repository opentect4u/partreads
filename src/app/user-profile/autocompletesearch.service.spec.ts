import { TestBed } from '@angular/core/testing';

import { AutocompletesearchService } from './autocompletesearch.service';

describe('AutocompletesearchService', () => {
  let service: AutocompletesearchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AutocompletesearchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
