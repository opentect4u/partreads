import { TestBed } from '@angular/core/testing';

import { EditbookserviceService } from './editbookservice.service';

describe('EditbookserviceService', () => {
  let service: EditbookserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EditbookserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
