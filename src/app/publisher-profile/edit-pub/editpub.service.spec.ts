import { TestBed } from '@angular/core/testing';

import { EditpubService } from './editpub.service';

describe('EditpubService', () => {
  let service: EditpubService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EditpubService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
