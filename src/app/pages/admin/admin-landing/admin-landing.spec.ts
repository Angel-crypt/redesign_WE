import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminLanding } from './admin-landing';

describe('AdminLanding', () => {
  let component: AdminLanding;
  let fixture: ComponentFixture<AdminLanding>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminLanding]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminLanding);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
