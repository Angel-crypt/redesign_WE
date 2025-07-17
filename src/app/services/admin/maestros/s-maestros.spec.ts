import { TestBed } from '@angular/core/testing';

import { SMaestros } from './s-maestros';

describe('SMaestros', () => {
  let service: SMaestros;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SMaestros);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
