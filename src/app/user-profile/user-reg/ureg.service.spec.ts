import { TestBed } from '@angular/core/testing';

import { UregService } from './ureg.service';

describe('UregService', () => {
  let service: UregService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UregService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
