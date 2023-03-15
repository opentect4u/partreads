import { TestBed } from '@angular/core/testing';

import { ClickserviceService } from './clickservice.service';

describe('ClickserviceService', () => {
  let service: ClickserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClickserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
