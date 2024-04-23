import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewRestuarantPage } from './preview-restuarant.page';

describe('PreviewRestuarantPage', () => {
  let component: PreviewRestuarantPage;
  let fixture: ComponentFixture<PreviewRestuarantPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreviewRestuarantPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreviewRestuarantPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
