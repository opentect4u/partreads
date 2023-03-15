import { TestBed } from '@angular/core/testing';

import { TopfiveService } from './topfive.service';

describe('TopfiveService', () => {
  let service: TopfiveService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TopfiveService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
