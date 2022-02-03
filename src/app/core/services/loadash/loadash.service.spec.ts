import { TestBed } from '@angular/core/testing';

import { LoadashService } from './loadash.service';

describe('LoadashService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LoadashService = TestBed.get(LoadashService);
    expect(service).toBeTruthy();
  });
});
