import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DropdownFetchOnFilterComponent } from './dropdown-fetch-on-filter-example';

describe('DropdownFetchOnFilterComponent', () => {
  let component: DropdownFetchOnFilterComponent;
  let fixture: ComponentFixture<DropdownFetchOnFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DropdownFetchOnFilterComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DropdownFetchOnFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
