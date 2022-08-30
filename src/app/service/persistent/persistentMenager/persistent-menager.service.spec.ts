import { TestBed } from '@angular/core/testing';

import { PersistentMenagerService } from './persistent-menager.service';

describe('PersistentMenagerService', () => {
  let service: PersistentMenagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PersistentMenagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
