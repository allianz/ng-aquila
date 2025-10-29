import { ComponentFixture, TestBed } from '@angular/core/testing';

import { A11ySkipToDataDescriptionComponent } from './a11y-skip-to-data-description-example';

describe('A11ySkipToDataDescriptionComponent', () => {
  let component: A11ySkipToDataDescriptionComponent;
  let fixture: ComponentFixture<A11ySkipToDataDescriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [A11ySkipToDataDescriptionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(A11ySkipToDataDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
