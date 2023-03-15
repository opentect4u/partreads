import { TestBed } from '@angular/core/testing';

import { NotificationserveService } from './notificationserve.service';

describe('NotificationserveService', () => {
  let service: NotificationserveService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotificationserveService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
