import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataMaestro } from './data-maestro';

describe('DataMaestro', () => {
  let component: DataMaestro;
  let fixture: ComponentFixture<DataMaestro>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DataMaestro]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DataMaestro);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
