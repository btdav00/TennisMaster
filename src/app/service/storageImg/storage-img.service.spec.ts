import { TestBed } from '@angular/core/testing';

import { StorageImgService } from './storage-img.service';

describe('StorageImgService', () => {
  let service: StorageImgService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StorageImgService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
