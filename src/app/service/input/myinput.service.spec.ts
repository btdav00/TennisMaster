import { TestBed } from '@angular/core/testing';

import { MyinputService } from './myinput.service';

describe('MyinputService', () => {
  let service: MyinputService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MyinputService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
