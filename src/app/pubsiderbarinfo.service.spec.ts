import { TestBed } from '@angular/core/testing';

import { PubsiderbarinfoService } from './pubsiderbarinfo.service';

describe('PubsiderbarinfoService', () => {
  let service: PubsiderbarinfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PubsiderbarinfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
