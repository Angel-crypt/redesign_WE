import { TestBed } from '@angular/core/testing';

import { DashboardAdminService } from './landing';

describe('DashboardAdminService', () => {
  let service: DashboardAdminService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DashboardAdminService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
