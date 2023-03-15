import { TestBed } from '@angular/core/testing';

import { NotificatiobelliconService } from './notificatiobellicon.service';

describe('NotificatiobelliconService', () => {
  let service: NotificatiobelliconService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotificatiobelliconService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
