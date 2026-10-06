import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchFieldAutocompleteExampleComponent } from './search-field-autocomplete-example';

describe('SearchFieldAutocompleteExampleComponent', () => {
  let component: SearchFieldAutocompleteExampleComponent;
  let fixture: ComponentFixture<SearchFieldAutocompleteExampleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchFieldAutocompleteExampleComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SearchFieldAutocompleteExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
