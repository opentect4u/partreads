import { TestBed } from '@angular/core/testing';

import { ChangepubstatusService } from './changepubstatus.service';

describe('ChangepubstatusService', () => {
  let service: ChangepubstatusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChangepubstatusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
