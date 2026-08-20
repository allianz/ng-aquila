import { ChangeDetectionStrategy, Component, Directive, Type, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NxCardComponent } from './card.component';
import { NxCardModule } from './card.module';

@Directive({ standalone: true })
abstract class CardTest {
  @ViewChild(NxCardComponent)
  cardInstance!: NxCardComponent;
  isDisabled = false;
  isClickable = false;
  isElevated = false;
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
    cardNativeElement = fixture.nativeElement.querySelector('nx-card') as HTMLButtonElement;
  }

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [NxCardModule, BasicCard, ClickableCardTest, ElevatedCardTest],
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

    it('has no tabindex attribute', () => {
      expect(cardNativeElement.getAttribute('tabindex')).toBeNull();
    });
  });

  describe('clickable card', () => {
    beforeEach(() => {
      createTestComponent(ClickableCardTest);
    });

    it('has is-clickable class when clickable & disabled is false', () => {
      const card = fixture.nativeElement.querySelector('nx-card');

      testInstance.isClickable = true;
      testInstance.isDisabled = false;
      fixture.detectChanges();

      expect(card).toHaveClass('is-clickable');
      expect(card).not.toHaveClass('is-disabled');
    });

    it('should set aria-disabled on the main link', () => {
      testInstance.isDisabled = true;
      fixture.detectChanges();
      const link = fixture.nativeElement.querySelector('[nxcardmainlink');
      expect(link.getAttribute('aria-disabled')).toBe('true');
      expect(link.getAttribute('role')).toBe('link');
    });
  });

  describe('elevated card', () => {
    beforeEach(() => {
      createTestComponent(ElevatedCardTest);
    });

    it('has no is-elevated class by default', () => {
      expect(cardNativeElement).not.toHaveClass('is-elevated');
    });

    it('has is-elevated class when elevated is true', () => {
      testInstance.isElevated = true;
      fixture.detectChanges();

      expect(cardNativeElement).toHaveClass('is-elevated');
    });
  });

  describe('a11y', () => {
    it('expert card has no accessibility violations', async () => {
      createTestComponent(BasicCard);
      await expect(fixture.nativeElement).toBeAccessible();
    });
  });
});

@Component({
  selector: 'test-basic-card',
  template: `<nx-card>Hello Text</nx-card>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NxCardModule],
})
class BasicCard extends CardTest {}

@Component({
  selector: 'test-clickable-card-test',
  template: `<nx-card [clickable]="isClickable" [disabled]="isDisabled"
    ><a href="/" nxCardMainLink>Card title</a>
    <p>Hello Text</p></nx-card
  >`,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NxCardModule],
})
class ClickableCardTest extends CardTest {}

@Component({
  selector: 'test-elevated-card-test',
  template: `<nx-card [elevated]="isElevated">Hello Text</nx-card>`,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NxCardModule],
})
class ElevatedCardTest extends CardTest {}
