import { TestBed } from '@angular/core/testing';

import { EdadMinMax } from './edad-min-max';

describe('EdadMinMax', () => {
  let service: EdadMinMax;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EdadMinMax);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
