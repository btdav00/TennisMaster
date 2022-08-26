import { TestBed } from '@angular/core/testing';

import { RedirectIfNotLoggedGuard } from './redirect-if-not-logged.guard';

describe('RedirectIfNotLoggedGuard', () => {
  let guard: RedirectIfNotLoggedGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(RedirectIfNotLoggedGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
