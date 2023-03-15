import { TestBed } from '@angular/core/testing';

import { ActiveserviceService } from './activeservice.service';

describe('ActiveserviceService', () => {
  let service: ActiveserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ActiveserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
