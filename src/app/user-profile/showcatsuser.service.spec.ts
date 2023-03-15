import { TestBed } from '@angular/core/testing';

import { ShowcatsuserService } from './showcatsuser.service';

describe('ShowcatsuserService', () => {
  let service: ShowcatsuserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShowcatsuserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
