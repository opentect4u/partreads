import { TestBed } from '@angular/core/testing';

import { PubdashboardserviceService } from './pubdashboardservice.service';

describe('PubdashboardserviceService', () => {
  let service: PubdashboardserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PubdashboardserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
