import { TestBed } from '@angular/core/testing';

import { UpdatecatService } from './updatecat.service';

describe('UpdatecatService', () => {
  let service: UpdatecatService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UpdatecatService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
