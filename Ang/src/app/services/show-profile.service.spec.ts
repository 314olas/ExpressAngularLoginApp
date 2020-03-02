import { TestBed } from '@angular/core/testing';

import { ShowProfileService } from './show-profile.service';

describe('ShowProfileService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ShowProfileService = TestBed.get(ShowProfileService);
    expect(service).toBeTruthy();
  });
});
