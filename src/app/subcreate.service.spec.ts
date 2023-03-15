import { TestBed } from '@angular/core/testing';

import { SubcreateService } from './subcreate.service';

describe('SubcreateService', () => {
  let service: SubcreateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubcreateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
