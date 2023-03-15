import { TestBed } from '@angular/core/testing';

import { ApprovebookService } from './approvebook.service';

describe('ApprovebookService', () => {
  let service: ApprovebookService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApprovebookService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
