import { TestBed } from '@angular/core/testing';

import { MatchPerformerService } from './match-performer.service';

describe('MatchPerformerService', () => {
  let service: MatchPerformerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MatchPerformerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
