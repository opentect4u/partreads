import { TestBed } from '@angular/core/testing';

import { MgmtcommisionService } from './mgmtcommision.service';

describe('MgmtcommisionService', () => {
  let service: MgmtcommisionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MgmtcommisionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
