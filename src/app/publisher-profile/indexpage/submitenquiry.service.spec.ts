import { TestBed } from '@angular/core/testing';

import { SubmitenquiryService } from './submitenquiry.service';

describe('SubmitenquiryService', () => {
  let service: SubmitenquiryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubmitenquiryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
