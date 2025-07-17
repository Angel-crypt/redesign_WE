import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataShow } from './data-show';

describe('DataShow', () => {
  let component: DataShow;
  let fixture: ComponentFixture<DataShow>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DataShow]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DataShow);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
