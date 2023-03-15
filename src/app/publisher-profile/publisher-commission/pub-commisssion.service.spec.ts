import { TestBed } from '@angular/core/testing';

import { PubCommisssionService } from './pub-commisssion.service';

describe('PubCommisssionService', () => {
  let service: PubCommisssionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PubCommisssionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
