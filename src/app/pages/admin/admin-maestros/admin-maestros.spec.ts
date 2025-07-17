import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminMaestros } from './admin-maestros';

describe('AdminMaestros', () => {
  let component: AdminMaestros;
  let fixture: ComponentFixture<AdminMaestros>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminMaestros]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminMaestros);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
