import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingA } from './landing-a';

describe('LandingA', () => {
  let component: LandingA;
  let fixture: ComponentFixture<LandingA>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LandingA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LandingA);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
