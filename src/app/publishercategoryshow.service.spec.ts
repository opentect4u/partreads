import { TestBed } from '@angular/core/testing';

import { PublishercategoryshowService } from './publishercategoryshow.service';

describe('PublishercategoryshowService', () => {
  let service: PublishercategoryshowService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PublishercategoryshowService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
