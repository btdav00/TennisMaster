import { TestBed } from '@angular/core/testing';

import { ClubPerformerService } from './club-performer.service';

describe('ClubPerformerService', () => {
  let service: ClubPerformerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClubPerformerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
