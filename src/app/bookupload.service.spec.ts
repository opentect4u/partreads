import { TestBed } from '@angular/core/testing';

import { BookuploadService } from './bookupload.service';

describe('BookuploadService', () => {
  let service: BookuploadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BookuploadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
