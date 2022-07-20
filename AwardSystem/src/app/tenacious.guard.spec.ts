import { TestBed } from '@angular/core/testing';

import { TenaciousGuard } from './tenacious.guard';

describe('TenaciousGuard', () => {
  let guard: TenaciousGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(TenaciousGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
