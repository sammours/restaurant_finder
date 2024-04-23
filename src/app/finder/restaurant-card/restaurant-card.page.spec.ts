import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurantCardPage } from './restaurant-card.page';

describe('RestaurantCardPage', () => {
  let component: RestaurantCardPage;
  let fixture: ComponentFixture<RestaurantCardPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RestaurantCardPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RestaurantCardPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
