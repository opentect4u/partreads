import { TestBed } from '@angular/core/testing';

import { NotificationbelliconspubService } from './notificationbelliconspub.service';

describe('NotificationbelliconspubService', () => {
  let service: NotificationbelliconspubService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotificationbelliconspubService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
