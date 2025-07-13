import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonAction } from './button-action';

describe('ButtonAction', () => {
  let component: ButtonAction;
  let fixture: ComponentFixture<ButtonAction>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ButtonAction]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ButtonAction);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
