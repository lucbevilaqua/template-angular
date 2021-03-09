import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenericCrudTableComponent } from './generic-crud-table.component';

describe('GenericCrudTableComponent', () => {
  let component: GenericCrudTableComponent;
  let fixture: ComponentFixture<GenericCrudTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenericCrudTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GenericCrudTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
