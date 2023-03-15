import { TestBed } from '@angular/core/testing';

import { EditbookshowService } from './editbookshow.service';

describe('EditbookshowService', () => {
  let service: EditbookshowService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EditbookshowService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
