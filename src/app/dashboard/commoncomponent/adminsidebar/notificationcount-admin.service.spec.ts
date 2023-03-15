import { TestBed } from '@angular/core/testing';

import { NotificationcountAdminService } from './notificationcount-admin.service';

describe('NotificationcountAdminService', () => {
  let service: NotificationcountAdminService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotificationcountAdminService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
