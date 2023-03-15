import { TestBed } from '@angular/core/testing';

import { UpdatecatserveService } from './updatecatserve.service';

describe('UpdatecatserveService', () => {
  let service: UpdatecatserveService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UpdatecatserveService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
