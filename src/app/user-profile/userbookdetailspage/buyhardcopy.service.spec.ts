import { TestBed } from '@angular/core/testing';

import { BuyhardcopyService } from './buyhardcopy.service';

describe('BuyhardcopyService', () => {
  let service: BuyhardcopyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BuyhardcopyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
