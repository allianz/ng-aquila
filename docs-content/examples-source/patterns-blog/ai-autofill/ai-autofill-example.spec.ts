import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AiAutofillComponent } from './ai-autofill-example';

describe('AiAutofillComponent', () => {
  let component: AiAutofillComponent;
  let fixture: ComponentFixture<AiAutofillComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AiAutofillComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AiAutofillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
