import { TestBed } from '@angular/core/testing';

import { UserDashboardServiceService } from './user-dashboard-service.service';

describe('UserDashboardServiceService', () => {
  let service: UserDashboardServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserDashboardServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
