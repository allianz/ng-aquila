import { AppearanceType, NxFormfieldModule } from '@allianz/ng-aquila/formfield';
import { DOWN_ARROW, END, ENTER, HOME, SPACE, TAB, UP_ARROW } from '@angular/cdk/keycodes';
import { OverlayContainer } from '@angular/cdk/overlay';
import {
  ChangeDetectionStrategy,
  Component,
  Directive,
  QueryList,
  Type,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { ComponentFixture, fakeAsync, flush, TestBed, tick } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { dispatchFakeEvent, dispatchKeyboardEvent } from '../../cdk-test-utils';
import { DROPDOWN_DEFAULT_OPTIONS } from '../dropdown';
import { NxMultiSelectComponent } from './multi-select.component';

interface Car {
  id: string;
  name: string;
  locked?: boolean;
}

interface CarGroup {
  label: string;
  options: Car[];
}

const createGroups = (): CarGroup[] => [
  {
    label: 'German',
    options: [
      { id: 'bmw', name: 'BMW' },
      { id: 'audi', name: 'Audi' },
    ],
  },
  {
    label: 'Swedish',
    options: [
      { id: 'volvo', name: 'Volvo' },
      { id: 'saab', name: 'Saab' },
    ],
  },
];

const createOptions = (length: number): Car[] =>
  Array.from({ length }, (_, i) => ({ id: `car-${i}`, name: `Car ${i}` }));

@Directive()
abstract class VirtualMultiSelectTest {
  @ViewChild(NxMultiSelectComponent) multiSelect!: NxMultiSelectComponent<any, string>;
  model: string[] = [];
  filter = false;
  appearance: AppearanceType = 'auto';
  selectDisabled?: string;
  disableSelectAll = false;
}

@Component({
  selector: 'test-virtual-multi-select',
  template: `<nx-formfield label="Car" [appearance]="appearance">
    <nx-multi-select
      virtualScroll
      [filter]="filter"
      [options]="options"
      selectValue="id"
      selectLabel="name"
      [selectDisabled]="selectDisabled"
      [disableSelectAll]="disableSelectAll"
      [(ngModel)]="model"
    ></nx-multi-select>
  </nx-formfield>`,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NxMultiSelectComponent, NxFormfieldModule, FormsModule],
})
class VirtualMultiSelect extends VirtualMultiSelectTest {
  options = createOptions(1000);
}

@Component({
  selector: 'test-virtual-grouped-multi-select',
  template: `<nx-formfield label="Car" [appearance]="appearance">
    <nx-multi-select
      grouped
      virtualScroll
      [filter]="filter"
      [options]="groups"
      selectValue="id"
      selectLabel="name"
      [selectDisabled]="selectDisabled"
      [(ngModel)]="model"
    ></nx-multi-select>
  </nx-formfield>`,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NxMultiSelectComponent, NxFormfieldModule, FormsModule],
})
class VirtualGroupedMultiSelect extends VirtualMultiSelectTest {
  groups = createGroups();
}

@Component({
  selector: 'test-virtual-primitive-multi-select',
  template: `<nx-formfield label="Number">
    <nx-multi-select virtualScroll [options]="options" [(ngModel)]="model"></nx-multi-select>
  </nx-formfield>`,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NxMultiSelectComponent, NxFormfieldModule, FormsModule],
})
class VirtualPrimitiveMultiSelect extends VirtualMultiSelectTest {
  options = [0, 1, 2];
}

@Component({
  selector: 'test-non-virtual-multi-select',
  template: `<nx-formfield label="Car">
    <nx-multi-select
      [virtualScroll]="false"
      [options]="options"
      selectValue="id"
      selectLabel="name"
      [(ngModel)]="model"
    ></nx-multi-select>
  </nx-formfield>`,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NxMultiSelectComponent, NxFormfieldModule, FormsModule],
})
class NonVirtualMultiSelect extends VirtualMultiSelectTest {
  options = createOptions(50);
}

@Component({
  selector: 'test-default-options-multi-select',
  template: `<nx-formfield label="Car">
      <nx-multi-select [options]="options" selectValue="id" selectLabel="name"></nx-multi-select>
    </nx-formfield>
    <nx-formfield label="Car">
      <nx-multi-select
        [virtualScroll]="false"
        [options]="options"
        selectValue="id"
        selectLabel="name"
      ></nx-multi-select>
    </nx-formfield>`,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NxMultiSelectComponent, NxFormfieldModule],
})
class DefaultOptionsMultiSelect extends VirtualMultiSelectTest {
  @ViewChildren(NxMultiSelectComponent) multiSelects!: QueryList<
    NxMultiSelectComponent<Car, string>
  >;
  options = createOptions(10);
}

describe('NxMultiSelectComponent with virtual scroll', () => {
  let fixture: ComponentFixture<VirtualMultiSelectTest>;
  let overlayContainer: OverlayContainer;

  function create<T extends VirtualMultiSelectTest>(
    component: Type<T>,
    setup: (instance: T) => void = () => {},
  ): T {
    TestBed.configureTestingModule({ imports: [component] });
    overlayContainer = TestBed.inject(OverlayContainer);
    fixture = TestBed.createComponent(component);
    setup(fixture.componentInstance as T);
    fixture.detectChanges();
    flush();
    fixture.detectChanges();
    return fixture.componentInstance as T;
  }

  afterEach(() => {
    overlayContainer?.ngOnDestroy();
  });

  function query<E extends Element = HTMLElement>(selector: string): E[] {
    return Array.from(overlayContainer.getContainerElement().querySelectorAll<E>(selector));
  }

  function settle() {
    fixture.detectChanges();
    flush();
    fixture.detectChanges();
  }

  function open() {
    (fixture.nativeElement.querySelector('.value') as HTMLElement).click();
    settle();
  }

  function options(): HTMLElement[] {
    return query('nx-virtual-viewport nx-multi-select-option');
  }

  function labels(): string[] {
    return options().map((option) => option.textContent!.trim());
  }

  function activeOption(): HTMLElement | undefined {
    return options().find((option) => option.querySelector('.nx-checkbox.is-active'));
  }

  function activeLabel(): string {
    return activeOption()?.textContent!.trim() ?? '';
  }

  function pressKey(keyCode: number, key: string) {
    dispatchKeyboardEvent(query('.panel')[0], 'keydown', keyCode, key);
    settle();
  }

  function filter(value: string) {
    const input = query<HTMLInputElement>('.filter input')[0];
    input.value = value;
    dispatchFakeEvent(input, 'input');
    settle();
  }

  /** For scrolling, which only renders new options after a real `scroll` event. */
  async function createAndOpen<T extends VirtualMultiSelectTest>(
    component: Type<T>,
    setup: (instance: T) => void = () => {},
  ): Promise<T> {
    TestBed.configureTestingModule({ imports: [component] });
    overlayContainer = TestBed.inject(OverlayContainer);
    fixture = TestBed.createComponent(component);
    setup(fixture.componentInstance as T);
    fixture.detectChanges();
    await fixture.whenStable();
    (fixture.nativeElement.querySelector('.value') as HTMLElement).click();
    await settleAsync();
    return fixture.componentInstance as T;
  }

  async function settleAsync() {
    fixture.detectChanges();
    await new Promise((resolve) => setTimeout(resolve, 50));
    fixture.detectChanges();
    await fixture.whenStable();
  }

  function rows(): string[] {
    return query('nx-virtual-viewport [data-virtual-index]')
      .sort((a, b) => Number(a.dataset['virtualIndex']) - Number(b.dataset['virtualIndex']))
      .map((row) =>
        row.querySelector('.group-label')
          ? `# ${row.textContent!.trim()}`
          : row.textContent!.trim(),
      );
  }

  describe('with many options', () => {
    it('renders only some of the options', fakeAsync(() => {
      create(VirtualMultiSelect);
      open();
      expect(options().length).toBeGreaterThan(0);
      expect(options().length).toBeLessThan(100);
      expect(labels()[0]).toBe('Car 0');
    }));

    it('announces the position of the rendered options in the whole list', fakeAsync(() => {
      create(VirtualMultiSelect);
      open();
      const [first, second] = options();
      expect(first.getAttribute('aria-posinset')).toBe('1');
      expect(second.getAttribute('aria-posinset')).toBe('2');
      expect(first.getAttribute('aria-setsize')).toBe('1000');
    }));

    it('selects an option on click', fakeAsync(() => {
      const testInstance = create(VirtualMultiSelect);
      open();
      options()[1].click();
      settle();
      expect(testInstance.model).toEqual(['car-1']);
    }));

    it('moves the selected options to the top when opened', fakeAsync(() => {
      create(VirtualMultiSelect, (instance) => (instance.model = ['car-500']));
      open();
      expect(labels().slice(0, 2)).toEqual(['Car 500', 'Car 0']);
      expect(options()[0].classList).toContain('divider');
    }));

    it('navigates with the keyboard and points aria-activedescendant to the active option', fakeAsync(() => {
      create(VirtualMultiSelect);
      open();
      expect(activeLabel()).toBe('Car 0');
      pressKey(DOWN_ARROW, 'ArrowDown');
      expect(activeLabel()).toBe('Car 1');
      expect(query('.panel')[0].getAttribute('aria-activedescendant')).toBe(activeOption()!.id);
      pressKey(UP_ARROW, 'ArrowUp');
      expect(activeLabel()).toBe('Car 0');
    }));

    it('renders and selects the last option with END and ENTER', async () => {
      const testInstance = await createAndOpen(VirtualMultiSelect);
      dispatchKeyboardEvent(query('.panel')[0], 'keydown', END, 'End');
      await settleAsync();
      expect(activeLabel()).toBe('Car 999');
      dispatchKeyboardEvent(query('.panel')[0], 'keydown', ENTER, 'Enter');
      await settleAsync();
      expect(testInstance.model).toEqual(['car-999']);
      expect(activeOption()!.getAttribute('aria-selected')).toBe('true');
    });

    it('opens with END on the closed trigger and highlights the last enabled option', async () => {
      TestBed.configureTestingModule({ imports: [VirtualMultiSelect] });
      overlayContainer = TestBed.inject(OverlayContainer);
      fixture = TestBed.createComponent(VirtualMultiSelect);
      fixture.componentInstance.selectDisabled = 'locked';
      (fixture.componentInstance as VirtualMultiSelect).options[999].locked = true;
      fixture.detectChanges();
      await fixture.whenStable();
      dispatchKeyboardEvent(fixture.nativeElement.querySelector('.value'), 'keydown', END, 'End');
      await settleAsync();
      expect(activeLabel()).toBe('Car 998');
      expect(query('.panel')[0].getAttribute('aria-activedescendant')).toBe(activeOption()!.id);
    });

    it('does not select the option highlighted before closing when reopening with ENTER', fakeAsync(() => {
      const testInstance = create(VirtualMultiSelect);
      open();
      pressKey(DOWN_ARROW, 'ArrowDown');
      pressKey(DOWN_ARROW, 'ArrowDown');
      pressKey(DOWN_ARROW, 'ArrowDown');
      pressKey(TAB, 'Tab');
      dispatchKeyboardEvent(
        fixture.nativeElement.querySelector('.value'),
        'keydown',
        ENTER,
        'Enter',
      );
      settle();
      expect(query('.panel')).toHaveLength(1);
      expect(testInstance.model).toEqual([]);
    }));

    it('does not select the option highlighted before closing when reopening with SPACE', fakeAsync(() => {
      const testInstance = create(VirtualMultiSelect);
      open();
      pressKey(DOWN_ARROW, 'ArrowDown');
      pressKey(TAB, 'Tab');
      dispatchKeyboardEvent(fixture.nativeElement.querySelector('.value'), 'keydown', SPACE, ' ');
      settle();
      expect(query('.panel')).toHaveLength(1);
      expect(testInstance.model).toEqual([]);
    }));

    it('opens with SPACE without typing it into the filter', fakeAsync(() => {
      create(VirtualMultiSelect, (instance) => (instance.filter = true));
      dispatchKeyboardEvent(fixture.nativeElement.querySelector('.value'), 'keydown', SPACE, ' ');
      settle();
      expect(query('.panel')).toHaveLength(1);
      expect(query<HTMLInputElement>('.filter input')[0].value).toBe('');
      expect(labels()[0]).toBe('Car 0');
    }));

    it('closes the panel with TAB', fakeAsync(() => {
      create(VirtualMultiSelect);
      open();
      pressKey(TAB, 'Tab');
      expect(query('.panel')).toHaveLength(0);
    }));

    it('skips disabled options', fakeAsync(() => {
      create(VirtualMultiSelect, (instance) => {
        instance.selectDisabled = 'locked';
        (instance as VirtualMultiSelect).options[1].locked = true;
      });
      open();
      pressKey(DOWN_ARROW, 'ArrowDown');
      expect(activeLabel()).toBe('Car 2');
    }));

    it('highlights the first matching option, even if the active one still matches', fakeAsync(() => {
      create(VirtualMultiSelect, (instance) => (instance.filter = true));
      open();
      for (let i = 0; i < 10; i++) {
        pressKey(DOWN_ARROW, 'ArrowDown');
      }
      expect(activeLabel()).toBe('Car 10');
      filter('Car 1');
      expect(labels().slice(0, 2)).toEqual(['Car 1', 'Car 10']);
      expect(activeLabel()).toBe('Car 1');
    }));

    it('skips disabled options when highlighting the first matching option', fakeAsync(() => {
      create(VirtualMultiSelect, (instance) => {
        instance.filter = true;
        instance.selectDisabled = 'locked';
        const { options } = instance as VirtualMultiSelect;
        options[1].locked = true;
        options[10].locked = true;
      });
      open();
      pressKey(DOWN_ARROW, 'ArrowDown');
      filter('Car 1');
      expect(activeLabel()).toBe('Car 11');
    }));

    it('renders the first matching option behind many disabled ones', async () => {
      await createAndOpen(VirtualMultiSelect, (instance) => {
        instance.filter = true;
        instance.selectDisabled = 'locked';
        (instance as VirtualMultiSelect).options
          .slice(0, 60)
          .forEach((option) => (option.locked = true));
      });
      const input = query<HTMLInputElement>('.filter input')[0];
      input.value = 'Car';
      dispatchFakeEvent(input, 'input');
      await settleAsync();
      expect(activeLabel()).toBe('Car 60');
      expect(input.getAttribute('aria-activedescendant')).toBe(activeOption()!.id);
    });

    describe('filtering after scrolling to the end', () => {
      function scrollTop(): number {
        return query('.nx-virtual-viewport__viewport')[0].scrollTop;
      }

      async function filterFromEnd(locked: (option: Car) => boolean) {
        await createAndOpen(VirtualMultiSelect, (instance) => {
          instance.filter = true;
          instance.selectDisabled = 'locked';
          (instance as VirtualMultiSelect).options
            .filter(locked)
            .forEach((option) => (option.locked = true));
        });
        dispatchKeyboardEvent(query('.panel')[0], 'keydown', END, 'End');
        await settleAsync();
        expect(labels()).not.toContain('Car 1');
        const input = query<HTMLInputElement>('.filter input')[0];
        input.value = 'Car 1';
        dispatchFakeEvent(input, 'input');
        await settleAsync();
      }

      it('shows the disabled matches above the first enabled one', async () => {
        await filterFromEnd((option) => option.id === 'car-1' || option.id === 'car-10');
        expect(scrollTop()).toBe(0);
        expect(activeLabel()).toBe('Car 11');
      });

      it('shows the start of the matches when all of them are disabled', async () => {
        await filterFromEnd((option) => option.name.startsWith('Car 1'));
        expect(scrollTop()).toBe(0);
        expect(activeOption()).toBeUndefined();
      });
    });

    it('highlights nothing and selects nothing with ENTER when no option matches', fakeAsync(() => {
      const testInstance = create(VirtualMultiSelect, (instance) => (instance.filter = true));
      open();
      filter('zzz');
      expect(query('.filter input')[0].getAttribute('aria-activedescendant')).toBeNull();
      pressKey(ENTER, 'Enter');
      expect(testInstance.model).toEqual([]);
    }));

    it('filters the options', fakeAsync(() => {
      create(VirtualMultiSelect, (instance) => (instance.filter = true));
      open();
      filter('Car 99');
      expect(labels()).toEqual([
        'Car 99',
        ...Array.from({ length: 10 }, (_, i) => `Car ${990 + i}`),
      ]);
    }));

    it('renders options that are falsy values', fakeAsync(() => {
      create(VirtualPrimitiveMultiSelect);
      open();
      expect(labels()).toEqual(['0', '1', '2']);
    }));

    it('renders new options that replace the old ones while open', async () => {
      const testInstance = await createAndOpen(VirtualMultiSelect);
      testInstance.multiSelect.scrollToValue('car-700');
      await settleAsync();
      expect(labels()).not.toContain('Car 0');

      (testInstance as VirtualMultiSelect).options = Array.from({ length: 1000 }, (_, i) => ({
        id: `new-${i}`,
        name: `New ${i}`,
      }));
      await settleAsync();
      expect(labels()[0]).toBe('New 0');
      expect(activeLabel()).toBe('New 0');

      testInstance.multiSelect.scrollToValue('new-700');
      await settleAsync();
      expect(labels()).toContain('New 700');
    });

    describe('replacing the options after highlighting one', () => {
      it('keeps the highlight on that option for the same data in new objects', fakeAsync(() => {
        const testInstance = create(VirtualMultiSelect) as VirtualMultiSelect;
        open();
        for (let i = 0; i < 5; i++) {
          pressKey(DOWN_ARROW, 'ArrowDown');
        }
        testInstance.options = createOptions(1000);
        settle();
        expect(activeLabel()).toBe('Car 5');
        expect(query('.panel')[0].getAttribute('aria-activedescendant')).toBe(activeOption()!.id);
      }));

      it('keeps the highlight on that option and scrolls to it when options are added above it', async () => {
        const testInstance = (await createAndOpen(VirtualMultiSelect)) as VirtualMultiSelect;
        for (let i = 0; i < 5; i++) {
          dispatchKeyboardEvent(query('.panel')[0], 'keydown', DOWN_ARROW, 'ArrowDown');
        }
        await settleAsync();
        testInstance.options = [
          ...Array.from({ length: 50 }, (_, i) => ({ id: `new-${i}`, name: `New ${i}` })),
          ...createOptions(1000),
        ];
        await settleAsync();
        expect(activeLabel()).toBe('Car 5');
        expect(query('.panel')[0].getAttribute('aria-activedescendant')).toBe(activeOption()!.id);
      });

      it('highlights the first option when the highlighted one is gone', fakeAsync(() => {
        const testInstance = create(VirtualMultiSelect) as VirtualMultiSelect;
        open();
        for (let i = 0; i < 5; i++) {
          pressKey(DOWN_ARROW, 'ArrowDown');
        }
        testInstance.options = createOptions(1000).filter((option) => option.id !== 'car-5');
        settle();
        expect(activeLabel()).toBe('Car 0');
      }));

      it('does not use the highlight of the last opening when options arrive while opening', fakeAsync(() => {
        const testInstance = create(VirtualMultiSelect) as VirtualMultiSelect;
        open();
        pressKey(END, 'End');
        tick(10);
        settle();
        pressKey(TAB, 'Tab');
        testInstance.options = createOptions(10);
        settle();
        (fixture.nativeElement.querySelector('.value') as HTMLElement).click();
        testInstance.options = createOptions(20);
        expect(() => fixture.detectChanges()).not.toThrow();
        settle();
        expect(activeLabel()).toBe('Car 0');
      }));

      it('keeps select all highlighted', fakeAsync(() => {
        const testInstance = create(VirtualMultiSelect, (instance) => {
          instance.appearance = 'outline';
        }) as VirtualMultiSelect;
        open();
        expect(query('nx-multi-select-all .is-active')).toHaveLength(1);
        testInstance.options = createOptions(1000);
        settle();
        expect(query('nx-multi-select-all .is-active')).toHaveLength(1);
        expect(activeOption()).toBeUndefined();
      }));

      it('keeps a far away highlighted option rendered without scrolling to the top', async () => {
        const testInstance = (await createAndOpen(VirtualMultiSelect)) as VirtualMultiSelect;
        dispatchKeyboardEvent(query('.panel')[0], 'keydown', END, 'End');
        await settleAsync();
        testInstance.options = [{ id: 'fiat', name: 'Fiat' }, ...createOptions(1000)];
        await settleAsync();
        expect(activeLabel()).toBe('Car 999');
        expect(labels()).not.toContain('Fiat');
      });
    });

    it('scrolls to an index in display order without virtual scroll', async () => {
      const testInstance = await createAndOpen(NonVirtualMultiSelect, (instance) => {
        instance.model = ['car-49'];
      });
      const list = query('.items')[0];
      expect(list.scrollTop).toBe(0);
      testInstance.multiSelect.scrollToIndex(49);
      await settleAsync();
      const last = query('nx-multi-select-option').find(
        (option) => option.textContent!.trim() === 'Car 48',
      )!;
      expect(list.scrollTop).toBeGreaterThan(0);
      expect(last.getBoundingClientRect().bottom).toBeLessThanOrEqual(
        list.getBoundingClientRect().bottom + 1,
      );
    });

    it('renders an option that is scrolled to by value', async () => {
      const testInstance = await createAndOpen(VirtualMultiSelect);
      expect(labels()).not.toContain('Car 700');
      testInstance.multiSelect.scrollToValue('car-700');
      await settleAsync();
      expect(labels()).toContain('Car 700');
    });

    describe('in an outline formfield', () => {
      it('counts the select all option in the position of the options', fakeAsync(() => {
        create(VirtualMultiSelect, (instance) => (instance.appearance = 'outline'));
        open();
        expect(options()[0].getAttribute('aria-posinset')).toBe('2');
        expect(options()[0].getAttribute('aria-setsize')).toBe('1001');
      }));

      it('navigates from select all to the options', fakeAsync(() => {
        create(VirtualMultiSelect, (instance) => (instance.appearance = 'outline'));
        open();
        expect(query('nx-multi-select-all .is-active')).toHaveLength(1);
        pressKey(DOWN_ARROW, 'ArrowDown');
        expect(query('nx-multi-select-all .is-active')).toHaveLength(0);
        expect(activeLabel()).toBe('Car 0');
      }));

      it('scrolls back to the top when HOME highlights select all', async () => {
        await createAndOpen(VirtualMultiSelect, (instance) => (instance.appearance = 'outline'));

        dispatchKeyboardEvent(query('.panel')[0], 'keydown', END, 'End');
        await settleAsync();
        expect(labels()).not.toContain('Car 0');

        dispatchKeyboardEvent(query('.panel')[0], 'keydown', HOME, 'Home');
        await settleAsync();
        expect(query('nx-multi-select-all .is-active')).toHaveLength(1);
        expect(labels()[0]).toBe('Car 0');
      });

      it('points aria-activedescendant to select all while it is highlighted', fakeAsync(() => {
        create(VirtualMultiSelect, (instance) => (instance.appearance = 'outline'));
        open();
        expect(query('.panel')[0].getAttribute('aria-activedescendant')).toBe(
          query('nx-multi-select-all')[0].id,
        );
      }));

      it('selects all options with ENTER on select all', fakeAsync(() => {
        const testInstance = create(VirtualMultiSelect, (instance) => {
          instance.appearance = 'outline';
        });
        open();
        pressKey(ENTER, 'Enter');
        expect(testInstance.model).toHaveLength(1000);
      }));

      it('selects all options with SPACE on select all', fakeAsync(() => {
        const testInstance = create(VirtualMultiSelect, (instance) => {
          instance.appearance = 'outline';
        });
        open();
        pressKey(SPACE, ' ');
        expect(testInstance.model).toHaveLength(1000);
      }));

      it('gives select all the first position of the list', fakeAsync(() => {
        create(VirtualMultiSelect, (instance) => (instance.appearance = 'outline'));
        open();
        const selectAll = query('nx-multi-select-all')[0];
        expect(selectAll.getAttribute('aria-posinset')).toBe('1');
        expect(selectAll.getAttribute('aria-setsize')).toBe('1001');
      }));

      it('gives select all no position in the list with filter', fakeAsync(() => {
        create(VirtualMultiSelect, (instance) => {
          instance.appearance = 'outline';
          instance.filter = true;
        });
        open();
        const selectAll = query('nx-multi-select-all')[0];
        expect(selectAll.hasAttribute('aria-posinset')).toBe(false);
        expect(selectAll.hasAttribute('aria-setsize')).toBe(false);
      }));

      it('does not count select all in the position of the options with filter', fakeAsync(() => {
        create(VirtualMultiSelect, (instance) => {
          instance.appearance = 'outline';
          instance.filter = true;
        });
        open();
        expect(options()[0].getAttribute('aria-posinset')).toBe('1');
        expect(options()[0].getAttribute('aria-setsize')).toBe('1000');
      }));

      it('highlights the first option, not select all, after filtering', fakeAsync(() => {
        create(VirtualMultiSelect, (instance) => {
          instance.appearance = 'outline';
          instance.filter = true;
        });
        open();
        expect(query('nx-multi-select-all .is-active')).toHaveLength(1);
        filter('Car 9');
        expect(query('nx-multi-select-all .is-active')).toHaveLength(0);
        expect(activeLabel()).toBe('Car 9');
      }));
      it('selects all options, including the ones that are not rendered', async () => {
        const testInstance = await createAndOpen(VirtualMultiSelect, (instance) => {
          instance.appearance = 'outline';
        });
        query('nx-multi-select-all')[0].click();
        await settleAsync();
        expect(testInstance.model).toHaveLength(1000);
        expect(options().every((option) => option.getAttribute('aria-selected') === 'true')).toBe(
          true,
        );

        testInstance.multiSelect.scrollToValue('car-700');
        await settleAsync();
        const scrolledTo = options().find((option) => option.textContent!.trim() === 'Car 700')!;
        expect(scrolledTo.getAttribute('aria-selected')).toBe('true');
      });

      it('starts at the first option without select all', fakeAsync(() => {
        create(VirtualMultiSelect, (instance) => {
          instance.appearance = 'outline';
          instance.disableSelectAll = true;
        });
        open();
        expect(query('nx-multi-select-all')).toHaveLength(0);
        expect(options()[0].getAttribute('aria-posinset')).toBe('1');
        expect(options()[0].getAttribute('aria-setsize')).toBe('1000');
        expect(activeLabel()).toBe('Car 0');
        pressKey(DOWN_ARROW, 'ArrowDown');
        expect(activeLabel()).toBe('Car 1');
        expect(query('.panel')[0].getAttribute('aria-activedescendant')).toBe(activeOption()!.id);
      }));

      it('highlights the first option, not select all, when options are already selected', fakeAsync(() => {
        create(VirtualMultiSelect, (instance) => {
          instance.appearance = 'outline';
          instance.model = ['car-5'];
        });
        open();
        expect(query('nx-multi-select-all .is-active')).toHaveLength(0);
        expect(activeLabel()).toBe('Car 5');
      }));
    });

    describe('option ids', () => {
      function activeDescendant(): string | null {
        return query('.filter input')[0].getAttribute('aria-activedescendant');
      }

      it('keeps the id of an option while filtering', fakeAsync(() => {
        create(VirtualMultiSelect, (instance) => (instance.filter = true));
        open();
        const id = options().find((option) => option.textContent!.trim() === 'Car 1')!.id;
        filter('Car 1');
        expect(options()[0].id).toBe(id);
      }));

      it('changes aria-activedescendant when filtering changes the first option', fakeAsync(() => {
        create(VirtualMultiSelect, (instance) => (instance.filter = true));
        open();
        const before = activeDescendant();
        filter('Car 5');
        expect(activeDescendant()).not.toBe(before);
        expect(activeDescendant()).toBe(activeOption()!.id);
      }));
    });
  });

  describe('typing a letter', () => {
    /** The key manager searches once typing pauses, debounced with an interval that only `tick` runs. */
    function type(target: Element, ...keys: string[]) {
      keys.forEach((key) => dispatchKeyboardEvent(target, 'keydown', 0, key));
      // Like the app would, so that the key manager knows the options before the search.
      fixture.detectChanges();
      tick(600);
      settle();
    }

    function typeOnTrigger(key: string) {
      type(fixture.nativeElement.querySelector('.value'), key);
    }

    it('highlights the next option starting with it without filter', fakeAsync(() => {
      create(VirtualGroupedMultiSelect);
      open();
      type(query('.panel')[0], 's');
      expect(activeLabel()).toBe('Saab');
    }));

    it('highlights the option starting with quickly typed letters without filter', fakeAsync(() => {
      create(VirtualGroupedMultiSelect, (instance) => {
        (instance as VirtualGroupedMultiSelect).groups[1].options[1].name = 'Volkswagen';
      });
      open();
      type(query('.panel')[0], 'v', 'o', 'l', 'k');
      expect(activeLabel()).toBe('Volkswagen');
    }));

    it('renders and highlights a matching option that is far away without filter', async () => {
      await createAndOpen(VirtualMultiSelect, (instance) => {
        (instance as VirtualMultiSelect).options[700].name = 'Zebra';
      });

      expect(labels()).not.toContain('Zebra');
      dispatchKeyboardEvent(query('.panel')[0], 'keydown', 0, 'z');
      // The key manager waits for typing to pause before it searches.
      await new Promise((resolve) => setTimeout(resolve, 600));
      await settleAsync();
      expect(activeLabel()).toBe('Zebra');
    });

    it('opens the closed panel and highlights the matching option without filter', fakeAsync(() => {
      create(VirtualGroupedMultiSelect);
      typeOnTrigger('v');
      expect(query('.panel')).toHaveLength(1);
      expect(activeLabel()).toBe('Volvo');
    }));

    it('opens the closed panel, fills the filter and highlights the first match', fakeAsync(() => {
      create(VirtualMultiSelect, (instance) => (instance.filter = true));
      typeOnTrigger('9');
      expect(query<HTMLInputElement>('.filter input')[0].value).toBe('9');
      expect(labels()[0]).toBe('Car 9');
      expect(activeLabel()).toBe('Car 9');
    }));

    it('keeps the first match highlighted over select all in an outline formfield', fakeAsync(() => {
      create(VirtualMultiSelect, (instance) => {
        instance.appearance = 'outline';
        instance.filter = true;
      });
      typeOnTrigger('9');
      expect(query('nx-multi-select-all .is-active')).toHaveLength(0);
      expect(activeLabel()).toBe('Car 9');
    }));
  });

  describe('with DROPDOWN_DEFAULT_OPTIONS', () => {
    it('enables virtual scroll unless the input is set', fakeAsync(() => {
      TestBed.configureTestingModule({
        providers: [{ provide: DROPDOWN_DEFAULT_OPTIONS, useValue: { virtualScroll: true } }],
      });
      const testInstance = create(DefaultOptionsMultiSelect);
      const [fromDefaults, fromInput] = testInstance.multiSelects.toArray();
      expect(fromDefaults.virtualScroll()).toBe(true);
      expect(fromInput.virtualScroll()).toBe(false);
    }));

    function openAt(index: number) {
      fixture.nativeElement.querySelectorAll('.value')[index].click();
      settle();
    }

    it('renders the options in the virtual viewport unless the input is set', fakeAsync(() => {
      TestBed.configureTestingModule({
        providers: [{ provide: DROPDOWN_DEFAULT_OPTIONS, useValue: { virtualScroll: true } }],
      });
      create(DefaultOptionsMultiSelect);
      openAt(0);
      expect(query('nx-virtual-viewport')).toHaveLength(1);
      expect(options().length).toBeGreaterThan(0);
    }));

    it('renders all options without the viewport if the input turns it off', fakeAsync(() => {
      TestBed.configureTestingModule({
        providers: [{ provide: DROPDOWN_DEFAULT_OPTIONS, useValue: { virtualScroll: true } }],
      });
      create(DefaultOptionsMultiSelect);
      openAt(1);
      expect(query('nx-virtual-viewport')).toHaveLength(0);
      expect(query('nx-multi-select-option')).toHaveLength(10);
    }));
  });

  describe('grouped', () => {
    it('renders a header row in front of each group', fakeAsync(() => {
      create(VirtualGroupedMultiSelect);
      open();
      expect(rows()).toEqual(['# German', 'BMW', 'Audi', '# Swedish', 'Volvo', 'Saab']);
    }));

    it('separates groups with a divider', fakeAsync(() => {
      create(VirtualGroupedMultiSelect);
      open();
      const headers = query('.group-label');
      expect(headers.map((header) => header.classList.contains('has-divider'))).toEqual([
        false,
        true,
      ]);
    }));

    it('wraps the rendered options of each group in a named group', fakeAsync(() => {
      create(VirtualGroupedMultiSelect);
      open();
      const groups = query('nx-virtual-viewport [role="group"]');
      expect(groups.map((group) => group.getAttribute('aria-label'))).toEqual([
        'German',
        'Swedish',
      ]);
      expect(
        Array.from(groups[1].querySelectorAll('nx-multi-select-option')).map((option) =>
          option.textContent!.trim(),
        ),
      ).toEqual(['Volvo', 'Saab']);
    }));

    it('hides the group headers from assistive technology', fakeAsync(() => {
      create(VirtualGroupedMultiSelect);
      open();
      const headers = query('.group-label');
      expect(headers).toHaveLength(2);
      expect(headers.every((header) => header.getAttribute('aria-hidden') === 'true')).toBe(true);
    }));

    it('counts the position in the set per group', fakeAsync(() => {
      create(VirtualGroupedMultiSelect);
      open();
      expect(options().map((option) => option.getAttribute('aria-posinset'))).toEqual([
        '1',
        '2',
        '1',
        '2',
      ]);
      expect(options().every((option) => option.getAttribute('aria-setsize') === '2')).toBe(true);
    }));

    it('moves selected options to the top of their group', fakeAsync(() => {
      create(VirtualGroupedMultiSelect, (instance) => (instance.model = ['saab']));
      open();
      expect(rows()).toEqual(['# German', 'BMW', 'Audi', '# Swedish', 'Saab', 'Volvo']);
    }));

    it('navigates across groups and skips disabled options', fakeAsync(() => {
      const testInstance = create(VirtualGroupedMultiSelect, (instance) => {
        instance.selectDisabled = 'locked';
        (instance as VirtualGroupedMultiSelect).groups[1].options[0].locked = true;
      });
      open();
      expect(activeLabel()).toBe('BMW');
      pressKey(DOWN_ARROW, 'ArrowDown');
      pressKey(DOWN_ARROW, 'ArrowDown');
      expect(activeLabel()).toBe('Saab');
      pressKey(ENTER, 'Enter');
      expect(testInstance.model).toEqual(['saab']);
    }));

    it('hides the header of groups without matching options', fakeAsync(() => {
      create(VirtualGroupedMultiSelect, (instance) => (instance.filter = true));
      open();
      filter('saab');
      expect(rows()).toEqual(['# Swedish', 'Saab']);
    }));

    it('shows all options of a group whose label matches', fakeAsync(() => {
      create(VirtualGroupedMultiSelect, (instance) => (instance.filter = true));
      open();
      filter('germ');
      expect(rows()).toEqual(['# German', 'BMW', 'Audi']);
    }));

    describe('with an option in two groups', () => {
      function createWithRepeatedOption() {
        create(VirtualGroupedMultiSelect, (instance) => {
          const { groups } = instance as VirtualGroupedMultiSelect;
          groups[1].options.unshift(groups[0].options[0]);
        });
        open();
      }

      function activeOptions() {
        return options().filter((option) => option.querySelector('.nx-checkbox.is-active'));
      }

      it('gives each row its own id', fakeAsync(() => {
        createWithRepeatedOption();
        expect(rows()).toEqual(['# German', 'BMW', 'Audi', '# Swedish', 'BMW', 'Volvo', 'Saab']);
        const ids = options().map((option) => option.id);
        expect(new Set(ids).size).toBe(ids.length);
      }));

      it('highlights only the row that is navigated to', fakeAsync(() => {
        createWithRepeatedOption();
        pressKey(DOWN_ARROW, 'ArrowDown');
        pressKey(DOWN_ARROW, 'ArrowDown');
        expect(activeOptions()).toEqual([options()[2]]);
        expect(query('.panel')[0].getAttribute('aria-activedescendant')).toBe(options()[2].id);
      }));

      it('counts the position of the repeated option in its own group', fakeAsync(() => {
        createWithRepeatedOption();
        expect(options().map((option) => option.getAttribute('aria-posinset'))).toEqual([
          '1',
          '2',
          '1',
          '2',
          '3',
        ]);
      }));
    });

    it('places the options below the measured height of their group header', async () => {
      await createAndOpen(VirtualGroupedMultiSelect);
      const [header, firstOption] = query('nx-virtual-viewport [data-virtual-index]').sort(
        (a, b) => Number(a.dataset['virtualIndex']) - Number(b.dataset['virtualIndex']),
      );
      expect(header.offsetHeight).toBeGreaterThan(40);
      expect(firstOption.style.transform).toBe(`translateY(${header.offsetHeight}px)`);
    });

    it('scrolls an option in a later group to the top by value', async () => {
      const testInstance = await createAndOpen(VirtualGroupedMultiSelect, (instance) => {
        (instance as VirtualGroupedMultiSelect).groups = Array.from({ length: 20 }, (_, group) => ({
          label: `Group ${group}`,
          options: Array.from({ length: 20 }, (__, i) => ({
            id: `car-${group}-${i}`,
            name: `Car ${group}-${i}`,
          })),
        }));
      });
      expect(labels()).not.toContain('Car 10-3');

      testInstance.multiSelect.scrollToValue('car-10-3');
      await settleAsync();
      const option = options().find((element) => element.textContent!.trim() === 'Car 10-3')!;
      const viewport = query('nx-virtual-viewport')[0];
      expect(option.getBoundingClientRect().top).toBeCloseTo(
        viewport.getBoundingClientRect().top,
        0,
      );
    });

    it('does not count select all in the position of the grouped options', fakeAsync(() => {
      create(VirtualGroupedMultiSelect, (instance) => (instance.appearance = 'outline'));
      open();
      const selectAll = query('nx-multi-select-all')[0];
      expect(selectAll.hasAttribute('aria-posinset')).toBe(false);
      expect(selectAll.hasAttribute('aria-setsize')).toBe(false);
      expect(options()[0].getAttribute('aria-posinset')).toBe('1');
      expect(options()[0].getAttribute('aria-setsize')).toBe('2');
    }));

    it('has no accessibility violations', async () => {
      await createAndOpen(VirtualGroupedMultiSelect);
      const panel = query('.panel')[0];
      expect(panel.querySelectorAll('[role="group"]')).toHaveLength(2);
      await expect(panel).toBeAccessible();
    });
  });
});
