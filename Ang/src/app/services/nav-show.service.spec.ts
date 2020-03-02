import { TestBed } from '@angular/core/testing';

import { NavShowService } from './nav-show.service';

describe('NavShowService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NavShowService = TestBed.get(NavShowService);
    expect(service).toBeTruthy();
  });
});
