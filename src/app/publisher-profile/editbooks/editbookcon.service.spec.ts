import { TestBed } from '@angular/core/testing';

import { EditbookconService } from './editbookcon.service';

describe('EditbookconService', () => {
  let service: EditbookconService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EditbookconService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
