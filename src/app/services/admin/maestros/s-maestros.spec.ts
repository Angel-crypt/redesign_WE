import { TestBed } from '@angular/core/testing';

import { AdminMaestrosService } from './s-maestros';

describe('AdminMaestrosService', () => {
  let service: AdminMaestrosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminMaestrosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
