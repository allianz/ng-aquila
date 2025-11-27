import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextAreaCharacterLimitExampleComponent } from './text-area-character-limit-example';

describe('TextAreaCharacterLimitExampleComponent', () => {
  let component: TextAreaCharacterLimitExampleComponent;
  let fixture: ComponentFixture<TextAreaCharacterLimitExampleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TextAreaCharacterLimitExampleComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TextAreaCharacterLimitExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
