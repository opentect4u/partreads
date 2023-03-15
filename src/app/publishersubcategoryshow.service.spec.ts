import { TestBed } from '@angular/core/testing';

import { PublishersubcategoryshowService } from './publishersubcategoryshow.service';

describe('PublishersubcategoryshowService', () => {
  let service: PublishersubcategoryshowService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PublishersubcategoryshowService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
