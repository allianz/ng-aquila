import { Component, Type } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NxEyebrowComponent } from './eyebrow.component';

describe('NxEyebrowComponent', () => {
  let fixture: ComponentFixture<EyebrowExampleComponent>;
  let testInstance: EyebrowExampleComponent;

  const createTestComponent = (component: Type<EyebrowExampleComponent>) => {
    fixture = TestBed.createComponent(component);
    fixture.detectChanges();
    testInstance = fixture.componentInstance;
  };

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [NxEyebrowComponent],
    }).compileComponents();
  }));

  it('creates the Eyebrow', waitForAsync(() => {
    createTestComponent(EyebrowExampleComponent);
    expect(testInstance).toBeTruthy();
  }));
});

@Component({
  selector: 'eyebrow-example',
  template: ` <nx-eyebrow size="s">Eyebrow Text</nx-eyebrow> `,
  imports: [NxEyebrowComponent],
})
export class EyebrowExampleComponent {}
