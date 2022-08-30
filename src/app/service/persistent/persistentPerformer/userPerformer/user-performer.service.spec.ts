import { TestBed } from '@angular/core/testing';

import { UserPerformerService } from './user-performer.service';

describe('UserPerformerService', () => {
  let service: UserPerformerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserPerformerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
