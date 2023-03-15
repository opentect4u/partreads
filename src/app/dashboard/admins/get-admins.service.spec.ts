import { TestBed } from '@angular/core/testing';

import { GetAdminsService } from './get-admins.service';

describe('GetAdminsService', () => {
  let service: GetAdminsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetAdminsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
