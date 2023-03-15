import { TestBed } from '@angular/core/testing';

import { UsereditService } from './useredit.service';

describe('UsereditService', () => {
  let service: UsereditService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsereditService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
