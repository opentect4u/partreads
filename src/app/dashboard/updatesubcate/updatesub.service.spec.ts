import { TestBed } from '@angular/core/testing';

import { UpdatesubService } from './updatesub.service';

describe('UpdatesubService', () => {
  let service: UpdatesubService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UpdatesubService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
