import { TestBed } from '@angular/core/testing';

import { CatShowService } from './cat-show.service';

describe('CatShowService', () => {
  let service: CatShowService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CatShowService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
