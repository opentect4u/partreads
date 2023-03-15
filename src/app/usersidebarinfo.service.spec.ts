import { TestBed } from '@angular/core/testing';

import { UsersidebarinfoService } from './usersidebarinfo.service';

describe('UsersidebarinfoService', () => {
  let service: UsersidebarinfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsersidebarinfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
