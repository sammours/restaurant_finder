import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FavouritePage } from './favourite.page';

describe('FavouritePage', () => {
  let component: FavouritePage;
  let fixture: ComponentFixture<FavouritePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FavouritePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FavouritePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
