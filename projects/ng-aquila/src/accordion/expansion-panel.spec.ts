import { ENTER, SPACE } from '@angular/cdk/keycodes';
import { _getFocusedElementPierceShadowDom } from '@angular/cdk/platform';
import { ChangeDetectionStrategy, Component, Directive, Type, ViewChild } from '@angular/core';
import {
  ComponentFixture,
  fakeAsync,
  flush,
  TestBed,
  tick,
  waitForAsync,
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { dispatchKeyboardEvent } from '../cdk-test-utils';
import { NxAccordionSize } from './accordion';
import { NxAccordionModule } from './accordion.module';
import { NxExpansionPanelComponent } from './expansion-panel';

describe('NxExpansionPanelComponent', () => {
  let fixture: ComponentFixture<PanelTest>;
  let testInstance: PanelTest;
  let panelInstance: NxExpansionPanelComponent;
  let panelNativeElement: HTMLElement;
  let headerNativeElement: HTMLElement;

  function createTestComponent(component: Type<PanelTest>) {
    fixture = TestBed.createComponent(component);
    fixture.detectChanges();
    testInstance = fixture.componentInstance;
    panelInstance = testInstance.panel;
    panelNativeElement = fixture.nativeElement.querySelector('nx-expansion-panel') as HTMLElement;
    headerNativeElement = fixture.nativeElement.querySelector(
      'nx-expansion-panel-header',
    ) as HTMLElement;
  }

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        NxAccordionModule,
        PanelWithContent,
        PanelWithContentInNgIf,
        PanelWithCustomMargin,
        LazyPanelWithContent,
        LazyPanelOpenOnLoad,
        PanelWithTwoWayBinding,
        PanelWithDifferentAppearances,
        PanelWithInverse,
        PanelWithInverseAccordion,
        PanelWithLegacyNegativeAccordion,
        PanelWithSizes,
        PanelWithAccordionSize,
        PanelWithAccordionSizeAndPanelVariant,
        PanelWithAccordion,
      ],
    });
    TestBed.compileComponents();
  }));

  it('should expand and collapse the panel', fakeAsync(() => {
    createTestComponent(PanelWithContent);
    const itemEl = fixture.nativeElement.querySelector('nx-expansion-panel');
    const headerEl = fixture.nativeElement.querySelector('nx-expansion-panel-header');
    fixture.detectChanges();

    expect(headerEl).not.toHaveClass('nx-expanded');
    expect(itemEl).not.toHaveClass('nx-expanded');

    fixture.componentInstance.expanded = true;
    fixture.detectChanges();
    flush();

    expect(headerEl).toHaveClass('nx-expanded');
    expect(itemEl).toHaveClass('nx-expanded');
  }));

  it('should be able to render panel content lazily', fakeAsync(() => {
    createTestComponent(LazyPanelWithContent);
    const content = fixture.debugElement.query(
      By.css('.nx-expansion-panel__content'),
    ).nativeElement;
    fixture.detectChanges();

    expect(content.textContent.trim(), 'Expected content element to be empty.').toBe('');

    fixture.componentInstance.expanded = true;
    fixture.detectChanges();

    expect(content.textContent.trim(), 'Expected content to be rendered.').toContain(
      'Some content',
    );
  }));

  it('should render the content for a lazy-loaded panel that is opened on init', fakeAsync(() => {
    createTestComponent(LazyPanelOpenOnLoad);
    const content = fixture.debugElement.query(
      By.css('.nx-expansion-panel__content'),
    ).nativeElement;
    fixture.detectChanges();

    expect(content.textContent.trim(), 'Expected content to be rendered.').toContain(
      'Some content',
    );
  }));

  it('emit correct events for change in panel expanded state', () => {
    createTestComponent(PanelWithContent);
    const panelWithContent = fixture.componentInstance as PanelWithContent;
    panelWithContent.expanded = true;
    fixture.detectChanges();
    expect(panelWithContent.openCallback).toHaveBeenCalled();

    panelWithContent.expanded = false;
    fixture.detectChanges();
    expect(panelWithContent.closeCallback).toHaveBeenCalled();
  });

  it('should create a unique panel id for each panel', () => {
    const fixtureOne = TestBed.createComponent(PanelWithContent);
    const headerElOne = fixtureOne.nativeElement.querySelector('.nx-expansion-panel__header');
    const fixtureTwo = TestBed.createComponent(PanelWithContent);
    const headerElTwo = fixtureTwo.nativeElement.querySelector('.nx-expansion-panel__header');
    fixtureOne.detectChanges();
    fixtureTwo.detectChanges();

    const panelIdOne = headerElOne.getAttribute('aria-controls');
    const panelIdTwo = headerElTwo.getAttribute('aria-controls');
    expect(panelIdOne).not.toBe(panelIdTwo);
  });

  it('should set `aria-labelledby` of the content to the header id', () => {
    createTestComponent(PanelWithContent);
    const headerEl = fixture.nativeElement.querySelector('.nx-expansion-panel__header');
    const contentEl = fixture.nativeElement.querySelector('.nx-expansion-panel__content');

    fixture.detectChanges();

    const headerId = headerEl.getAttribute('id');
    const contentLabel = contentEl.getAttribute('aria-labelledby');

    expect(headerId).toBeTruthy();
    expect(contentLabel).toBeTruthy();
    expect(headerId).toBe(contentLabel);
  });

  it('should set the proper role on the content element', () => {
    createTestComponent(PanelWithContent);
    const contentEl = fixture.nativeElement.querySelector('.nx-expansion-panel__content');

    expect(contentEl.getAttribute('role')).toBe('region');
  });

  it('should toggle the panel when pressing SPACE on the header', () => {
    createTestComponent(PanelWithContent);
    const headerEl = fixture.nativeElement.querySelector('nx-expansion-panel-header');

    vi.spyOn(fixture.componentInstance.panel, 'toggle').mockReturnValue(undefined);

    const event = dispatchKeyboardEvent(headerEl, 'keydown', SPACE);

    fixture.detectChanges();

    expect(fixture.componentInstance.panel.toggle).toHaveBeenCalled();
    expect(event.defaultPrevented).toBe(true);
  });

  it('should toggle the panel when pressing ENTER on the header', () => {
    createTestComponent(PanelWithContent);
    const headerEl = fixture.nativeElement.querySelector('nx-expansion-panel-header');

    vi.spyOn((fixture.componentInstance as PanelWithContent).panel, 'toggle').mockReturnValue(
      undefined,
    );

    const event = dispatchKeyboardEvent(headerEl, 'keydown', ENTER);

    fixture.detectChanges();

    expect((fixture.componentInstance as PanelWithContent).panel.toggle).toHaveBeenCalled();
    expect(event.defaultPrevented).toBe(true);
  });

  it('should not be able to focus content while closed', fakeAsync(() => {
    createTestComponent(PanelWithContent);
    fixture.componentInstance.expanded = true;
    fixture.detectChanges();
    tick(500);

    const button = fixture.debugElement.query(By.css('#test-button')).nativeElement;

    button.focus();
    expect(_getFocusedElementPierceShadowDom(), 'Expected button to start off focusable.').toBe(
      button,
    );

    button.blur();

    fixture.componentInstance.expanded = false;
    fixture.detectChanges();
    tick(600);
    fixture.detectChanges();

    button.focus();
    fixture.detectChanges();

    expect(
      _getFocusedElementPierceShadowDom(),
      'Expected button to no longer be focusable.',
    ).not.toBe(button);
  }));

  it('should update the indicator rotation when the expanded state is toggled programmatically', fakeAsync(() => {
    createTestComponent(PanelWithContent);
    fixture.detectChanges();
    tick(250);

    const arrow = fixture.debugElement.query(By.css('.nx-expansion-panel__chevron')).nativeElement;

    expect(arrow).toHaveClass('chevron-rotate-closed');
    expect(arrow).not.toHaveClass('chevron-rotate-open');

    fixture.componentInstance.expanded = true;
    fixture.detectChanges();
    tick(250);

    expect(arrow).toHaveClass('chevron-rotate-open');
    expect(arrow).not.toHaveClass('chevron-rotate-closed');
  }));

  it('should make sure accordion item runs ngOnDestroy when expansion panel is destroyed', () => {
    createTestComponent(PanelWithContentInNgIf);
    let destroyedOk = false;
    fixture.componentInstance.panel.destroyed.subscribe(() => (destroyedOk = true));
    (fixture.componentInstance as PanelWithContentInNgIf).expansionShown = false;
    fixture.detectChanges();
    expect(destroyedOk).toBe(true);
  });

  it('should support two-way binding of the `expanded` property', () => {
    createTestComponent(PanelWithTwoWayBinding);
    const header = fixture.debugElement.query(
      By.css('.nx-expansion-panel__header-content'),
    ).nativeElement;

    expect(fixture.componentInstance.expanded).toBe(false);

    header.click();
    fixture.detectChanges();
    expect(fixture.componentInstance.expanded).toBe(true);

    header.click();
    fixture.detectChanges();
    expect(fixture.componentInstance.expanded).toBe(false);
  });

  describe('appearance', () => {
    it('should allow negative appearance', () => {
      createTestComponent(PanelWithDifferentAppearances);
      expect(panelNativeElement).not.toHaveClass('nx-expansion-panel--negative');

      const instance = testInstance as PanelWithDifferentAppearances;
      instance.negative = true;

      fixture.detectChanges();

      expect(panelNativeElement).toHaveClass('nx-expansion-panel--negative');
    });

    it('should allow inverse appearance', () => {
      createTestComponent(PanelWithInverse);
      const instance = testInstance as PanelWithInverse;
      expect(panelNativeElement).not.toHaveClass('nx-expansion-panel--negative');

      instance.panelInverse = true;
      fixture.detectChanges();

      expect(panelNativeElement).toHaveClass('nx-expansion-panel--negative');
    });

    it('should inherit inverse from the parent accordion', () => {
      createTestComponent(PanelWithInverseAccordion);

      expect(panelNativeElement).toHaveClass('nx-expansion-panel--negative');
    });

    it('should inherit the legacy negative flag of the accordion as inverse', () => {
      createTestComponent(PanelWithLegacyNegativeAccordion);

      expect(panelNativeElement).toHaveClass('nx-expansion-panel--negative');
      expect(panelInstance.negative).toBe(true);
    });

    it('should have regular style by default', () => {
      createTestComponent(PanelWithDifferentAppearances);
      expect(panelNativeElement).toHaveClass('nx-expansion-panel--regular');
    });

    it('should set light style', () => {
      createTestComponent(PanelWithDifferentAppearances);
      expect(panelNativeElement).not.toHaveClass('nx-expansion-panel--light');

      const instance = testInstance as PanelWithDifferentAppearances;
      instance.style = 'light';

      fixture.detectChanges();

      expect(panelNativeElement).toHaveClass('nx-expansion-panel--light');
    });

    it('should set extra-light style', () => {
      createTestComponent(PanelWithDifferentAppearances);
      expect(panelNativeElement).not.toHaveClass('nx-expansion-panel--extra-light');

      const instance = testInstance as PanelWithDifferentAppearances;
      instance.style = 'extra-light';

      fixture.detectChanges();

      expect(panelNativeElement).toHaveClass('nx-expansion-panel--extra-light');
    });

    it('should set regular style', () => {
      createTestComponent(PanelWithDifferentAppearances);
      const instance = testInstance as PanelWithDifferentAppearances;
      instance.style = 'light';
      fixture.detectChanges();
      expect(panelNativeElement).not.toHaveClass('nx-expansion-panel--regular');

      instance.style = 'regular';

      fixture.detectChanges();
      expect(panelNativeElement).toHaveClass('nx-expansion-panel--regular');
    });

    it('should ignore unknown styles and fallback to regular', () => {
      createTestComponent(PanelWithDifferentAppearances);
      const instance = testInstance as PanelWithDifferentAppearances;
      instance.style = 'unknown';
      fixture.detectChanges();

      expect(panelNativeElement).toHaveClass('nx-expansion-panel--regular');
    });

    it('should inherit negative flag from parent accordion', () => {
      createTestComponent(PanelWithAccordion);
      expect(panelNativeElement).toHaveClass('nx-expansion-panel--negative');
    });

    it('should prefer own negative flag', () => {
      createTestComponent(PanelWithAccordion);
      expect(panelNativeElement).toHaveClass('nx-expansion-panel--negative');

      const secondPanel = fixture.debugElement.query(
        By.css('nx-expansion-panel:nth-child(2)'),
      ).nativeElement;
      expect(secondPanel).not.toHaveClass('nx-expansion-panel--negative');
    });

    it('should inherit style from parent accordion', () => {
      createTestComponent(PanelWithAccordion);
      expect(panelNativeElement).toHaveClass('nx-expansion-panel--light');

      const secondPanel = fixture.debugElement.query(
        By.css('nx-expansion-panel:nth-child(2)'),
      ).nativeElement;
      expect(secondPanel).toHaveClass('nx-expansion-panel--regular');
    });

    it('should map the panel size to a style class', () => {
      createTestComponent(PanelWithSizes);
      const instance = testInstance as PanelWithSizes;

      instance.panelSize = 'm';
      fixture.detectChanges();
      expect(panelNativeElement).toHaveClass('nx-expansion-panel--light');

      instance.panelSize = 'l';
      fixture.detectChanges();
      expect(panelNativeElement).toHaveClass('nx-expansion-panel--regular');
    });

    it('should inherit the size from the parent accordion', () => {
      createTestComponent(PanelWithSizes);
      const instance = testInstance as PanelWithSizes;

      instance.accordionSize = 'm';
      fixture.detectChanges();

      expect(panelNativeElement).toHaveClass('nx-expansion-panel--light');
    });

    it('should prefer its own size over the size of the accordion', () => {
      createTestComponent(PanelWithSizes);
      const instance = testInstance as PanelWithSizes;

      instance.accordionSize = 'l';
      instance.panelSize = 'm';
      fixture.detectChanges();

      expect(panelNativeElement).toHaveClass('nx-expansion-panel--light');
      expect(panelNativeElement).not.toHaveClass('nx-expansion-panel--regular');
    });

    it('should prefer the size over the variant of the accordion', () => {
      createTestComponent(PanelWithAccordionSize);

      expect(panelNativeElement).toHaveClass('nx-expansion-panel--extra-light');
      expect(panelNativeElement).not.toHaveClass('nx-expansion-panel--light');
    });

    it('should prefer its own variant over the size of the accordion', () => {
      createTestComponent(PanelWithAccordionSizeAndPanelVariant);

      expect(panelNativeElement).toHaveClass('nx-expansion-panel--extra-light');
      expect(panelNativeElement).not.toHaveClass('nx-expansion-panel--light');
    });

    it('should override style of accordion if value is present', () => {
      createTestComponent(FlushPanelWithAccordion);

      const expansionPanelHeader = fixture.debugElement.query(
        By.css('.nx-expansion-panel__header-content'),
      );
      const panel = fixture.componentInstance.panel;

      expect(panel.flushAlignment).toBeTruthy();
      expect(expansionPanelHeader.classes['flush-aligned']).toBeTruthy();
    });
  });

  describe('disabled state', () => {
    beforeEach(() => {
      createTestComponent(PanelWithContent);
    });

    it('should toggle the aria-disabled attribute and is-disabled class on the header', () => {
      expect(headerNativeElement.getAttribute('aria-disabled')).toBe('false');
      expect(headerNativeElement).not.toHaveClass('is-disabled');

      fixture.componentInstance.disabled = true;
      fixture.detectChanges();

      expect(headerNativeElement.getAttribute('aria-disabled')).toBe('true');
      expect(headerNativeElement).toHaveClass('is-disabled');
    });

    it('should not be able to toggle the panel via a user action if disabled', () => {
      expect(fixture.componentInstance.panel.expanded).toBe(false);
      expect(headerNativeElement).not.toHaveClass('nx-expanded');

      fixture.componentInstance.disabled = true;
      fixture.detectChanges();

      headerNativeElement.click();
      fixture.detectChanges();

      expect(fixture.componentInstance.panel.expanded).toBe(false);
      expect(headerNativeElement).not.toHaveClass('nx-expanded');
    });

    it('should be able to toggle a disabled expansion panel programmatically', () => {
      expect(fixture.componentInstance.panel.expanded).toBe(false);
      expect(headerNativeElement).not.toHaveClass('nx-expanded');

      fixture.componentInstance.disabled = true;
      fixture.detectChanges();

      fixture.componentInstance.expanded = true;
      fixture.detectChanges();

      expect(fixture.componentInstance.panel.expanded).toBe(true);
      expect(headerNativeElement).toHaveClass('nx-expanded');
    });
  });
});

@Directive({ standalone: true })
abstract class PanelTest {
  expanded = false;
  disabled = false;

  @ViewChild(NxExpansionPanelComponent)
  panel!: NxExpansionPanelComponent;
}

@Component({
  selector: 'test-panel-with-content',
  template: `<nx-expansion-panel
    [expanded]="expanded"
    [disabled]="disabled"
    (opened)="openCallback()"
    (closed)="closeCallback()"
  >
    <nx-expansion-panel-header>Panel Title</nx-expansion-panel-header>
    <p>Some content</p>
    <button id="test-button">I am a button</button>
  </nx-expansion-panel>`,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NxAccordionModule],
})
class PanelWithContent extends PanelTest {
  openCallback = vi.fn().mockName('openCallback');
  closeCallback = vi.fn().mockName('closeCallback');
}

@Component({
  selector: 'test-panel-with-content-in-ng-if',
  template: `@if (expansionShown) {
    <div>
      <nx-expansion-panel>
        <nx-expansion-panel-header>Panel Title</nx-expansion-panel-header>
      </nx-expansion-panel>
    </div>
  }`,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NxAccordionModule],
})
class PanelWithContentInNgIf extends PanelTest {
  expansionShown = true;
}

@Component({
  selector: 'test-panel-with-custom-margin',
  styles: [
    `
      nx-expansion-panel {
        margin: 13px 37px;
      }
    `,
  ],
  template: `<nx-expansion-panel [expanded]="expanded">
    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolores officia, aliquam dicta
    corrupti maxime voluptate accusamus impedit atque incidunt pariatur.
  </nx-expansion-panel>`,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NxAccordionModule],
})
class PanelWithCustomMargin extends PanelTest {}

@Component({
  selector: 'test-lazy-panel-with-content',
  template: `<nx-expansion-panel [expanded]="expanded">
    <nx-expansion-panel-header
      ><nx-expansion-panel-title>Panel Title</nx-expansion-panel-title></nx-expansion-panel-header
    >

    <ng-template nxExpansionPanelBody>
      <p>Some content</p>
      <button>I am a button</button>
    </ng-template>
  </nx-expansion-panel>`,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NxAccordionModule],
})
class LazyPanelWithContent extends PanelTest {}

@Component({
  selector: 'test-lazy-panel-open-on-load',
  template: `<nx-expansion-panel [expanded]="true">
    <nx-expansion-panel-header
      ><nx-expansion-panel-title>Panel Title</nx-expansion-panel-title></nx-expansion-panel-header
    >

    <ng-template nxExpansionPanelBody>
      <p>Some content</p>
    </ng-template>
  </nx-expansion-panel>`,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NxAccordionModule],
})
class LazyPanelOpenOnLoad extends PanelTest {}

@Component({
  selector: 'test-panel-with-two-way-binding',
  template: `<nx-expansion-panel [(expanded)]="expanded">
    <nx-expansion-panel-header>Panel Title</nx-expansion-panel-header>
  </nx-expansion-panel>`,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NxAccordionModule],
})
class PanelWithTwoWayBinding extends PanelTest {}

@Component({
  selector: 'test-panel-with-different-appearances',
  template: `<nx-expansion-panel [negative]="negative" [variant]="style">
    <nx-expansion-panel-header>Panel Title</nx-expansion-panel-header>
  </nx-expansion-panel>`,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NxAccordionModule],
})
class PanelWithDifferentAppearances extends PanelTest {
  style: any = null;
  negative = false;
}

@Component({
  selector: 'test-panel-with-inverse',
  template: `<nx-expansion-panel [inverse]="panelInverse">
    <nx-expansion-panel-header>Panel Title</nx-expansion-panel-header>
  </nx-expansion-panel>`,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NxAccordionModule],
})
class PanelWithInverse extends PanelTest {
  panelInverse = false;
}

@Component({
  selector: 'test-panel-with-inverse-accordion',
  template: `<nx-accordion inverse="true">
    <nx-expansion-panel>
      <nx-expansion-panel-header>Panel Title</nx-expansion-panel-header>
    </nx-expansion-panel>
  </nx-accordion>`,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NxAccordionModule],
})
class PanelWithInverseAccordion extends PanelTest {}

@Component({
  selector: 'test-panel-with-legacy-negative-accordion',
  template: `<nx-accordion negative="true">
    <nx-expansion-panel>
      <nx-expansion-panel-header>Panel Title</nx-expansion-panel-header>
    </nx-expansion-panel>
  </nx-accordion>`,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NxAccordionModule],
})
class PanelWithLegacyNegativeAccordion extends PanelTest {}

@Component({
  selector: 'test-panel-with-sizes',
  template: `<nx-accordion [size]="accordionSize">
    <nx-expansion-panel [size]="panelSize">
      <nx-expansion-panel-header>Panel Title</nx-expansion-panel-header>
    </nx-expansion-panel>
  </nx-accordion>`,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NxAccordionModule],
})
class PanelWithSizes extends PanelTest {
  accordionSize?: NxAccordionSize;
  panelSize?: NxAccordionSize;
}

@Component({
  selector: 'test-panel-with-accordion-size',
  template: `<nx-accordion variant="light" variant="extra-light">
    <nx-expansion-panel>
      <nx-expansion-panel-header>Panel Title</nx-expansion-panel-header>
    </nx-expansion-panel>
  </nx-accordion>`,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NxAccordionModule],
})
class PanelWithAccordionSize extends PanelTest {}

@Component({
  selector: 'test-panel-with-accordion-size-and-panel-variant',
  template: `<nx-accordion size="m">
    <nx-expansion-panel variant="extra-light">
      <nx-expansion-panel-header>Panel Title</nx-expansion-panel-header>
    </nx-expansion-panel>
  </nx-accordion>`,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NxAccordionModule],
})
class PanelWithAccordionSizeAndPanelVariant extends PanelTest {}

@Component({
  selector: 'test-panel-with-accordion',
  template: `<nx-accordion negative="true" variant="light">
    <nx-expansion-panel>
      <nx-expansion-panel-header>Panel Title</nx-expansion-panel-header>
    </nx-expansion-panel>
    <nx-expansion-panel negative="false" variant="regular">
      <nx-expansion-panel-header>Panel Title</nx-expansion-panel-header>
    </nx-expansion-panel>
    <nx-accordion></nx-accordion
  ></nx-accordion>`,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NxAccordionModule],
})
class PanelWithAccordion extends PanelTest {}

@Component({
  selector: 'test-flush-panel-with-accordion',
  template: ` <nx-accordion flushAlignment="false">
    <nx-expansion-panel flushAlignment="true" #firstPanel>
      <nx-expansion-panel-header
        ><nx-expansion-panel-title>
          Panel Title
        </nx-expansion-panel-title></nx-expansion-panel-header
      >
    </nx-expansion-panel>
  </nx-accordion>`,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NxAccordionModule],
})
class FlushPanelWithAccordion extends PanelTest {
  @ViewChild('firstPanel', { static: true })
  panel!: NxExpansionPanelComponent;
}
