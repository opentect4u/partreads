import { TestBed } from '@angular/core/testing';

import { CheckpagesincartService } from './checkpagesincart.service';

describe('CheckpagesincartService', () => {
  let service: CheckpagesincartService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CheckpagesincartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
