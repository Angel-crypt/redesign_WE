import { TestBed } from '@angular/core/testing';

import { PlaneacionS } from './planeacion-s';

describe('PlaneacionS', () => {
  let service: PlaneacionS;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlaneacionS);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
