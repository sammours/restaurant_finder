import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FindingRestaurantComponent } from './finding-restaurant.component';

describe('FindingRestaurantComponent', () => {
  let component: FindingRestaurantComponent;
  let fixture: ComponentFixture<FindingRestaurantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FindingRestaurantComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FindingRestaurantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
