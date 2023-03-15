import { TestBed } from '@angular/core/testing';

import { SubcatshowService } from './subcatshow.service';

describe('SubcatshowService', () => {
  let service: SubcatshowService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubcatshowService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
