import { Component, Type, ViewChild, ChangeDetectionStrategy, Directive } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import * as axe from 'axe-core';

import {NxCardComponent} from './card.component';
import {NxCardModule} from './card.module';

// For better readablity here, We can safely ignore some conventions in our specs
// tslint:disable:component-class-suffix

@Directive()
abstract class CardTest {
  @ViewChild(NxCardComponent) cardInstance: NxCardComponent;
  selected = false;
}

describe('NxCardComponent', () => {
  let fixture: ComponentFixture<CardTest>;
  let testInstance: CardTest;
  let cardInstance: NxCardComponent;
  let cardNativeElement: HTMLButtonElement;

  function createTestComponent(component: Type<CardTest>) {
    fixture = TestBed.createComponent(component);
    fixture.detectChanges();
    testInstance = fixture.componentInstance;
    cardInstance = testInstance.cardInstance;
    cardNativeElement = (fixture.nativeElement.querySelector('nx-card') as HTMLButtonElement);
  }

  function assertSelected(checked: boolean) {
    fixture.detectChanges();
    expect(testInstance.selected).toBe(checked);
    expect(cardInstance.selected).toBe(checked);
    expect(cardNativeElement.classList.contains('is-selected')).toBe(checked);
  }

  function pressKey(key: string) {
    cardNativeElement.dispatchEvent(new KeyboardEvent('keydown', { key }));
    fixture.detectChanges();
  }

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        BasicCard,
        DynamicCard,
        DisabledCard
      ],
      imports: [
        NxCardModule
      ]
    }).compileComponents();
  }));

  it('creates the component', waitForAsync(() => {
    createTestComponent(BasicCard);
    expect(cardInstance).toBeTruthy();
  }));

  describe('basic card', () => {
    beforeEach(() => {
      createTestComponent(BasicCard);
    });

    it('has no tabindex', () => {
      expect(cardNativeElement.getAttribute('tabindex')).toBe('');
    });

    it('is not selectable', () => {
      expect(cardNativeElement.classList.contains('is-selectable')).toBe(false);
    });

    it('is not clickable', () => {
      cardNativeElement.click();
      expect(cardNativeElement.classList.contains('is-selected')).toBe(false);
    });
  });

  describe('disabled card', () => {

    it('has tab index -1', () => {
      createTestComponent(DisabledCard);

      expect(cardNativeElement.getAttribute('tabindex')).toBe('-1');
    });

    it('is not clickable', () => {
      createTestComponent(DisabledCard);

      cardNativeElement.click();
      expect(cardNativeElement.classList.contains('is-selected')).toBe(false);
    });
  });

  describe('selectable card', () => {
    beforeEach(() => {
      createTestComponent(DynamicCard);
      (testInstance as DynamicCard).selectable = true;
      fixture.detectChanges();
    });

    it('is not selected', () => {
      assertSelected(false);
    });

    it('has a tabindex', () => {
      expect(cardNativeElement.getAttribute('tabindex')).toBe('0');
    });

    it('should change the selectable-state on binding changes', waitForAsync(() => {
      expect(cardNativeElement.classList.contains('is-selectable')).toBe(true);
    }));

    it('toggles the selected state based on [selected] input', () => {
      fixture.componentInstance.selected = true;
      assertSelected(true);
    });

    it('toggles the selected state based on user actions (click)', () => {
      cardNativeElement.click();
      assertSelected(true);
      cardNativeElement.click();
      assertSelected(false);
    });

    it('toggles the selected state based on user actions (enter)', () => {
      pressKey('Enter');
      assertSelected(true);
      pressKey('Enter');
      assertSelected(false);
    });
  });

  describe('programatic changes', () => {
    beforeEach(() => {
      createTestComponent(BasicCard);
    });

    it('is selectable', () => {
      cardInstance.selectable = true;
      fixture.detectChanges();
      expect(cardNativeElement.classList.contains('is-selectable')).toBe(true);
    });

    it('is selected', () => {
      cardInstance.selectable = true;
      cardInstance.selected = true;
      fixture.detectChanges();
      expect(cardNativeElement.classList.contains('is-selected')).toBe(true);
    });

    it('updates view on [disabled] change', () => {
      cardInstance.disabled = true;
      fixture.detectChanges();
      expect(cardNativeElement.classList.contains('is-disabled')).toBe(true);
    });
  });

  describe('a11y', () => {
    it('has no accessibility violations', function (done) {
      createTestComponent(BasicCard);

      axe.run(fixture.nativeElement, {}, (error: Error, results: axe.AxeResults) => {
        expect(results.violations.length).toBe(0);
        const violationMessages = results.violations.map(item => item.description);
        done();
      });
    });
  });
});

@Component({
  template: `
    <nx-card>Hello Text</nx-card>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
class BasicCard extends CardTest {
}

@Component({
  template: `
    <nx-card
      [selectable]="selectable"
      [(selected)]="selected">Hello Text
    </nx-card>
  `
})
class DynamicCard extends CardTest {
  selectable = false;
  selected = false;
}

@Component({
  template: `
    <nx-card
      selectable="true"
      [disabled]="disabled">Hello Text
    </nx-card>
  `
})
class DisabledCard extends CardTest {
  disabled = true;
}
