import { TestBed } from '@angular/core/testing';

import { StatusservService } from './statusserv.service';

describe('StatusservService', () => {
  let service: StatusservService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StatusservService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
