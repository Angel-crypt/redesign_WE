import { TestBed } from '@angular/core/testing';

import { SSidebar } from './s-sidebar';

describe('SSidebar', () => {
  let service: SSidebar;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SSidebar);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
