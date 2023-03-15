import { TestBed } from '@angular/core/testing';

import { SearchinitService } from './searchinit.service';

describe('SearchinitService', () => {
  let service: SearchinitService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SearchinitService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
