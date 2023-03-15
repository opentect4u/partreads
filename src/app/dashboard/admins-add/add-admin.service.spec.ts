import { TestBed } from '@angular/core/testing';

import { AddAdminService } from './add-admin.service';

describe('AddAdminService', () => {
  let service: AddAdminService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddAdminService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
