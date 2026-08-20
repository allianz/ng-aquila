import { NxInfoIconComponent } from '@allianz/ng-aquila/info-icon';
import { OverlayContainer } from '@angular/cdk/overlay';
import { ChangeDetectionStrategy, Component, Directive, Type, ViewChild } from '@angular/core';
import {
  ComponentFixture,
  fakeAsync,
  inject,
  TestBed,
  tick,
  waitForAsync,
} from '@angular/core/testing';

import {
  LABEL_DEFAULT_OPTIONS,
  LABEL_SIZE_TYPE,
  LabelDefaultOptions,
  NxLabelComponent,
} from './label.component';
import { NxLabelModule } from './label.module';
import { NxLabelInfoDirective } from './label-info.directive';

const customDefaultOptions: LabelDefaultOptions = { size: 'small' };

@Directive({ standalone: true })
abstract class LabelTest {
  @ViewChild(NxLabelComponent)
  labelInstance!: NxLabelComponent;
  size!: LABEL_SIZE_TYPE;
}

describe('NxLabelComponent', () => {
  let fixture: ComponentFixture<LabelTest>;
  let testInstance: LabelTest;
  let labelInstance: NxLabelComponent;
  let labelElement: HTMLElement;

  function createTestComponent(component: Type<LabelTest>) {
    fixture = TestBed.createComponent(component);
    fixture.detectChanges();
    testInstance = fixture.componentInstance;
    labelInstance = testInstance.labelInstance;
    labelElement = fixture.nativeElement.querySelector('nx-label');
  }

  describe('basic', () => {
    beforeEach(waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [NxLabelModule, BasicLabel],
      }).compileComponents();
    }));

    it('creates the nx-label', waitForAsync(() => {
      createTestComponent(BasicLabel);
      expect(labelInstance).toBeTruthy();
      expect(labelInstance.size).toBe('large');
    }));
  });

  describe('injection token', () => {
    beforeEach(waitForAsync(() => {
      customDefaultOptions.size = 'small';
      TestBed.configureTestingModule({
        imports: [NxLabelModule, BasicLabel, ConfigurableLabel],
        providers: [{ provide: LABEL_DEFAULT_OPTIONS, useValue: customDefaultOptions }],
      }).compileComponents();
    }));

    it('creates a label with the correct size', () => {
      createTestComponent(BasicLabel);
      expect(labelInstance.size).toBe('small');
      expect(labelElement).toHaveClass('nx-label--small');
      expect(labelElement).not.toHaveClass('nx-label--large');
    });

    it('changes the appearance on changes', inject(
      [LABEL_DEFAULT_OPTIONS],
      (defaultOptions: LabelDefaultOptions) => {
        createTestComponent(BasicLabel);
        defaultOptions.size = 'large';
        fixture.detectChanges();
        expect(labelInstance.size).toBe('large');
        expect(labelElement).not.toHaveClass('nx-label--small');
        expect(labelElement).toHaveClass('nx-label--large');
      },
    ));

    it('creates a label with the correct size if the size is explicilty set', () => {
      createTestComponent(ConfigurableLabel);
      testInstance.size = 'large';
      fixture.detectChanges();
      expect(labelInstance.size).toBe('large');
      expect(labelElement).not.toHaveClass('nx-label--small');
      expect(labelElement).toHaveClass('nx-label--large');
    });
  });

  describe('info icon', () => {
    let overlayContainer: OverlayContainer;

    beforeEach(waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [NxLabelModule, BasicLabel, InfoIconLabel, CustomInfoLabel],
      }).compileComponents();
    }));

    beforeEach(() => {
      inject([OverlayContainer], (oc: OverlayContainer) => {
        overlayContainer = oc;
      })();
    });

    afterEach(() => {
      overlayContainer.ngOnDestroy();
    });

    /** Opens the info icon popover so its projected content renders into the overlay. */
    function openPopover() {
      const button = labelElement.querySelector('nx-info-icon button') as HTMLButtonElement;
      button.click();
      fixture.detectChanges();
      tick();
    }

    function getOverlayContent(): HTMLElement {
      return overlayContainer
        .getContainerElement()
        .querySelector('.nx-popover__content') as HTMLElement;
    }

    it('does not render an info icon when none is projected', () => {
      createTestComponent(BasicLabel);
      expect(labelElement.querySelector('nx-info-icon')).toBeNull();
    });

    it('renders a projected info icon and projects its content', fakeAsync(() => {
      createTestComponent(InfoIconLabel);

      const infoIcon = labelElement.querySelector('nx-info-icon');
      expect(infoIcon).not.toBeNull();

      openPopover();
      expect(getOverlayContent().textContent).toContain('Some helpful info');
    }));

    it('renders the info icon outside of the <label> element for accessibility', () => {
      createTestComponent(InfoIconLabel);

      const infoIcon = labelElement.querySelector('nx-info-icon')!;
      const label = labelElement.querySelector('label')!;
      expect(label.contains(infoIcon)).toBe(false);
    });

    it('renders structured content projected into the info icon', fakeAsync(() => {
      createTestComponent(CustomInfoLabel);
      const infoIcon = labelElement.querySelector('nx-info-icon');
      expect(infoIcon).not.toBeNull();

      openPopover();
      expect(getOverlayContent().querySelector('.template-content')).not.toBeNull();
    }));

    it('renders a custom info-icon implementation in the slot', () => {
      createTestComponent(CustomInfoLabel);
      expect(labelElement.querySelector('[data-custom-info]')).not.toBeNull();
    });
  });
});

@Component({
  selector: 'test-basic-label',
  template: `<nx-label>I am a label</nx-label>`,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NxLabelModule],
})
class BasicLabel extends LabelTest {}

@Component({
  selector: 'test-configurable-label',
  template: `<nx-label [size]="size">I am a label</nx-label>`,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NxLabelModule],
})
class ConfigurableLabel extends LabelTest {}

@Component({
  selector: 'test-info-icon-label',
  template: `
    <nx-label>
      I am a label
      <nx-info-icon nxLabelInfo>Some helpful info</nx-info-icon>
    </nx-label>
  `,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NxLabelModule, NxLabelInfoDirective, NxInfoIconComponent],
})
class InfoIconLabel extends LabelTest {}

/** Stands in for an entity-specific info-icon implementation projected into the slot. */
@Component({
  selector: 'custom-info-icon',
  standalone: true,
  imports: [NxInfoIconComponent],
  template: `
    <nx-info-icon data-custom-info>
      <span class="template-content">Rich info</span>
    </nx-info-icon>
  `,
})
class CustomInfoIconStub {}

@Component({
  selector: 'test-custom-info-label',
  template: `
    <nx-label>
      I am a label
      <custom-info-icon nxLabelInfo></custom-info-icon>
    </nx-label>
  `,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NxLabelModule, NxLabelInfoDirective, CustomInfoIconStub],
})
class CustomInfoLabel extends LabelTest {}
