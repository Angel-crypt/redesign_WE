import { TestBed } from '@angular/core/testing';

import { MaestroAuthService } from './s-auth';

describe('MaestroAuthService', () => {
  let service: MaestroAuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MaestroAuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
