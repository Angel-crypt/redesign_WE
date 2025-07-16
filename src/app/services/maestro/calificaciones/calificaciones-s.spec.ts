import { TestBed } from '@angular/core/testing';

import { CalificacionesS } from './calificaciones-s';

describe('CalificacionesS', () => {
  let service: CalificacionesS;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CalificacionesS);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
