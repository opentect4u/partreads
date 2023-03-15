import { TestBed } from '@angular/core/testing';

import { PrevBookService } from './prev-book.service';

describe('PrevBookService', () => {
  let service: PrevBookService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PrevBookService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
