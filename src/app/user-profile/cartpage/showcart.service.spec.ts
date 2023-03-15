import { TestBed } from '@angular/core/testing';

import { ShowcartService } from './showcart.service';

describe('ShowcartService', () => {
  let service: ShowcartService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShowcartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
