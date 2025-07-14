import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisponibilidadCalendar } from './disponibilidad-calendar';

describe('DisponibilidadCalendar', () => {
  let component: DisponibilidadCalendar;
  let fixture: ComponentFixture<DisponibilidadCalendar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DisponibilidadCalendar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisponibilidadCalendar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
