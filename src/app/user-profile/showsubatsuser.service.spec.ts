import { TestBed } from '@angular/core/testing';

import { ShowsubatsuserService } from './showsubatsuser.service';

describe('ShowsubatsuserService', () => {
  let service: ShowsubatsuserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShowsubatsuserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
