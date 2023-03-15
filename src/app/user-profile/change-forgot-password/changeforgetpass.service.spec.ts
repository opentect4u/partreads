import { TestBed } from '@angular/core/testing';

import { ChangeforgetpassService } from './changeforgetpass.service';

describe('ChangeforgetpassService', () => {
  let service: ChangeforgetpassService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChangeforgetpassService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
