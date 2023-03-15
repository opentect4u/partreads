import { TestBed } from '@angular/core/testing';

import { BookPrevService } from './book-prev.service';

describe('BookPrevService', () => {
  let service: BookPrevService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BookPrevService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
