import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignedGroups } from './assigned-groups';

describe('AssignedGroups', () => {
  let component: AssignedGroups;
  let fixture: ComponentFixture<AssignedGroups>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AssignedGroups]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssignedGroups);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
