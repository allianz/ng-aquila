import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchFieldInputExampleComponent } from './search-field-input-example';

describe('SearchFieldInputExampleComponent', () => {
  let component: SearchFieldInputExampleComponent;
  let fixture: ComponentFixture<SearchFieldInputExampleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchFieldInputExampleComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SearchFieldInputExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
