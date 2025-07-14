import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatosPerfil } from './datos-perfil';

describe('DatosPerfil', () => {
  let component: DatosPerfil;
  let fixture: ComponentFixture<DatosPerfil>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DatosPerfil]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DatosPerfil);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
