import { NxFormfieldModule } from '@allianz/ng-aquila/formfield';
import { DOWN_ARROW, ENTER, UP_ARROW } from '@angular/cdk/keycodes';
import { OverlayContainer } from '@angular/cdk/overlay';
import { ChangeDetectionStrategy, Component, Directive, Type, ViewChild } from '@angular/core';
import { ComponentFixture, fakeAsync, flush, TestBed, tick } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { dispatchFakeEvent, dispatchKeyboardEvent } from '../cdk-test-utils';
import { NxDropdownComponent, NxDropdownFilterFn, NxDropdownOption } from './dropdown';
import { NxDropdownModule } from './dropdown.module';

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

const createCars = (): Car[] => createGroups().flatMap((group) => group.options);

@Directive()
abstract class OptionsDropdownTest {
  @ViewChild(NxDropdownComponent) dropdown!: NxDropdownComponent<any>;
  model: any = null;
}

describe('NxDropdownComponent with options', () => {
  let fixture: ComponentFixture<OptionsDropdownTest>;
  let overlayContainer: OverlayContainer;
  let dropdownElement: HTMLElement;

  function create<T extends OptionsDropdownTest>(component: Type<T>): T {
    TestBed.configureTestingModule({ imports: [component] });
    overlayContainer = TestBed.inject(OverlayContainer);
    fixture = TestBed.createComponent(component);
    fixture.detectChanges();
    flush();
    fixture.detectChanges();
    dropdownElement = fixture.debugElement.query(By.css('nx-dropdown')).nativeElement;
    return fixture.componentInstance as T;
  }

  afterEach(() => {
    overlayContainer?.ngOnDestroy();
  });

  function query<E extends Element = HTMLElement>(selector: string): E[] {
    return Array.from(overlayContainer.getContainerElement().querySelectorAll<E>(selector));
  }

  function open() {
    (fixture.nativeElement.querySelector('.nx-dropdown__container') as HTMLElement).click();
    fixture.detectChanges();
    flush();
    fixture.detectChanges();
  }

  function triggerText(): string {
    return fixture.nativeElement.querySelector('.nx-dropdown__rendered').textContent.trim();
  }

  function labels(selector = 'nx-dropdown-item:not(.nx-hidden)'): string[] {
    return query(selector).map((item) => item.textContent!.trim());
  }

  function clickOption(label: string) {
    const option = query('.nx-dropdown-results__option-label').find(
      (item) => item.textContent!.trim() === label,
    )!;
    option.click();
    fixture.detectChanges();
    flush();
  }

  function filter(value: string) {
    const input = query<HTMLInputElement>('.nx-dropdown__filter-input')[0];
    input.value = value;
    dispatchFakeEvent(input, 'input');
    fixture.detectChanges();
    flush();
    fixture.detectChanges();
  }

  function pressKey(keyCode: number) {
    dispatchKeyboardEvent(dropdownElement, 'keydown', keyCode);
    fixture.detectChanges();
    flush();
    fixture.detectChanges();
  }

  function activeLabel(): string {
    return query('nx-dropdown-item.nx-dropdown-item--active')[0]?.textContent!.trim() ?? '';
  }

  describe('accessibility', () => {
    async function openPanel(component: Type<OptionsDropdownTest>): Promise<Element> {
      TestBed.configureTestingModule({ imports: [component] });
      overlayContainer = TestBed.inject(OverlayContainer);
      fixture = TestBed.createComponent(component);
      fixture.detectChanges();
      await fixture.whenStable();
      (fixture.nativeElement.querySelector('.nx-dropdown__container') as HTMLElement).click();
      fixture.detectChanges();
      await new Promise((resolve) => setTimeout(resolve, 50));
      fixture.detectChanges();
      await fixture.whenStable();
      return overlayContainer.getContainerElement().querySelector('.nx-dropdown__panel')!;
    }

    it('has no violations in the grouped list', async () => {
      const panel = await openPanel(GroupedDropdown);
      expect(panel.querySelectorAll('[role="group"]')).toHaveLength(2);
      await expect(panel).toBeAccessible();
    });

    it('has no violations in the grouped virtual list', async () => {
      const panel = await openPanel(VirtualGroupedDropdown);
      expect(panel.querySelectorAll('[role="group"]')).toHaveLength(2);
      await expect(panel).toBeAccessible();
    });
  });

  describe('without enough space for the panel', () => {
    afterEach(() => viewport.reset());

    async function scrollToLastOption(component: Type<OptionsDropdownTest>) {
      viewport.set(1000, 260);
      TestBed.configureTestingModule({ imports: [component] });
      overlayContainer = TestBed.inject(OverlayContainer);
      fixture = TestBed.createComponent(component);
      fixture.detectChanges();
      await fixture.whenStable();
      (fixture.nativeElement.querySelector('.nx-dropdown__container') as HTMLElement).click();
      fixture.detectChanges();
      await new Promise((resolve) => setTimeout(resolve, 100));
      fixture.detectChanges();

      const container = overlayContainer.getContainerElement();
      const list = (container.querySelector('.nx-virtual-viewport__viewport') ??
        container.querySelector('.nx-dropdown__panel-body')) as HTMLElement;
      list.scrollTop = list.scrollHeight;
      list.dispatchEvent(new Event('scroll'));
      await new Promise((resolve) => setTimeout(resolve, 50));
      fixture.detectChanges();

      const pane = container.querySelector('.cdk-overlay-pane')!.getBoundingClientRect();
      const options = query('nx-dropdown-item');
      return { pane, lastOption: options[options.length - 1] };
    }

    it('keeps the last option reachable', async () => {
      const { pane, lastOption } = await scrollToLastOption(GroupedDropdown);
      expect(lastOption.textContent!.trim()).toBe('Saab');
      expect(lastOption.getBoundingClientRect().bottom).toBeLessThanOrEqual(pane.bottom);
    });

    it('keeps the last option reachable with virtual scroll', async () => {
      const { pane, lastOption } = await scrollToLastOption(VirtualGroupedDropdown);
      expect(lastOption.textContent!.trim()).toBe('Saab');
      expect(lastOption.getBoundingClientRect().bottom).toBeLessThanOrEqual(pane.bottom);
    });
  });

  describe('with custom keys', () => {
    it('renders the labels read with selectLabel', fakeAsync(() => {
      create(CustomKeysDropdown);
      open();
      expect(labels()).toEqual(['BMW', 'Audi', 'Volvo', 'Saab']);
    }));

    it('writes the value read with selectValue to the model', fakeAsync(() => {
      const testInstance = create(CustomKeysDropdown);
      open();
      clickOption('Volvo');
      expect(testInstance.model).toBe('volvo');
      expect(triggerText()).toBe('Volvo');
    }));

    it('shows the label of the option of the model', fakeAsync(() => {
      const testInstance = create(CustomKeysDropdown);
      testInstance.model = 'audi';
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      expect(triggerText()).toBe('Audi');
    }));

    it('reads the value and label again when the selectors change', fakeAsync(() => {
      const testInstance = create(CustomKeysDropdown);
      testInstance.selectLabel = 'id';
      fixture.detectChanges();
      open();
      expect(labels()).toEqual(['bmw', 'audi', 'volvo', 'saab']);
    }));
  });

  describe('with selector functions', () => {
    it('reads value and label with the functions', fakeAsync(() => {
      const testInstance = create(SelectorFunctionDropdown);
      open();
      expect(labels()).toEqual(['BMW (bmw)', 'Audi (audi)', 'Volvo (volvo)', 'Saab (saab)']);
      clickOption('Saab (saab)');
      expect(testInstance.model).toBe('SAAB');
    }));
  });

  it('uses the whole option as value when selectValue is empty', fakeAsync(() => {
    const testInstance = create(WholeObjectDropdown);
    open();
    clickOption('Audi');
    expect(testInstance.model).toBe(testInstance.cars[1]);
  }));

  it('displays the formatted value of options without a label', fakeAsync(() => {
    create(NoLabelDropdown);
    open();
    expect(labels()).toEqual(['#1', '#2']);
  }));

  describe('with selectDisabled', () => {
    it('disables the options', fakeAsync(() => {
      create(DisabledOptionsDropdown);
      open();
      const items = query('nx-dropdown-item');
      expect(items.map((item) => item.getAttribute('aria-disabled'))).toEqual([
        'false',
        'true',
        'false',
        'false',
      ]);
    }));

    it('does not select a disabled option', fakeAsync(() => {
      const testInstance = create(DisabledOptionsDropdown);
      open();
      clickOption('Audi');
      expect(testInstance.model).toBeNull();
    }));

    it('does not disable options with a `locked` property without selectDisabled', fakeAsync(() => {
      create(CustomKeysDropdown);
      open();
      expect(query('nx-dropdown-item[aria-disabled="true"]')).toHaveLength(0);
    }));
  });

  describe('with a `disabled` property', () => {
    it('disables the options by default', fakeAsync(() => {
      const testInstance = create(DefaultDisabledDropdown);
      open();
      expect(query('nx-dropdown-item').map((item) => item.getAttribute('aria-disabled'))).toEqual([
        'false',
        'true',
        'false',
      ]);
      clickOption('Two');
      expect(testInstance.model).toBeNull();
    }));

    it('disables no option with an empty selectDisabled', fakeAsync(() => {
      const testInstance = create(DefaultDisabledDropdown);
      testInstance.selectDisabled = '';
      fixture.detectChanges();
      open();
      expect(query('nx-dropdown-item[aria-disabled="true"]')).toHaveLength(0);
    }));

    it('skips the options in virtual typeahead', fakeAsync(() => {
      create(DefaultDisabledVirtualDropdown);
      open();
      dispatchKeyboardEvent(dropdownElement, 'keydown', undefined, 't');
      tick(250);
      fixture.detectChanges();
      expect(activeLabel()).toBe('Three');
    }));

    it('does not skip them in virtual typeahead with another selectDisabled', fakeAsync(() => {
      const testInstance = create(DefaultDisabledVirtualDropdown);
      testInstance.selectDisabled = 'locked';
      fixture.detectChanges();
      open();
      dispatchKeyboardEvent(dropdownElement, 'keydown', undefined, 't');
      tick(250);
      fixture.detectChanges();
      expect(activeLabel()).toBe('Two');
    }));
  });

  it('passes the original option to the item template', fakeAsync(() => {
    create(ItemTemplateDropdown);
    open();
    expect(query('.custom-item').map((item) => item.textContent!.trim())).toEqual([
      'bmw: BMW',
      'audi: Audi',
      'volvo: Volvo',
      'saab: Saab',
    ]);
  }));

  describe('when options are added while the panel is open', () => {
    function detectChanges() {
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
    }

    it('keeps the rendered items', fakeAsync(() => {
      const testInstance = create(CustomKeysDropdown);
      open();
      const items = query('nx-dropdown-item');

      testInstance.cars = [...testInstance.cars, { id: 'vw', name: 'VW' }];
      detectChanges();

      expect(labels()).toEqual(['BMW', 'Audi', 'Volvo', 'Saab', 'VW']);
      items.forEach((item, i) => expect(query('nx-dropdown-item')[i]).toBe(item));
    }));

    it('keeps the rendered items of a group', fakeAsync(() => {
      const testInstance = create(GroupedDropdown);
      open();
      const items = query('nx-dropdown-item');

      testInstance.groups = testInstance.groups.map((group, i) =>
        i === 0 ? { ...group, options: [...group.options, { id: 'vw', name: 'VW' }] } : group,
      );
      detectChanges();

      expect(labels()).toEqual(['BMW', 'Audi', 'VW', 'Volvo', 'Saab']);
      expect(query('nx-dropdown-item')[0]).toBe(items[0]);
      expect(query('nx-dropdown-item')[1]).toBe(items[1]);
      expect(query('nx-dropdown-item')[3]).toBe(items[2]);
      expect(query('nx-dropdown-item')[4]).toBe(items[3]);
    }));
  });

  describe('grouped', () => {
    function groupLabels(): string[] {
      return query('nx-dropdown-group:not(.nx-hidden) .nx-dropdown-results__group-label').map(
        (label) => label.textContent!.trim(),
      );
    }

    it('renders the options in their groups', fakeAsync(() => {
      create(GroupedDropdown);
      open();
      const groups = query('nx-dropdown-group');
      expect(groups).toHaveLength(2);
      expect(groupLabels()).toEqual(['German', 'Swedish']);
      expect(
        Array.from(groups[1].querySelectorAll('nx-dropdown-item')).map((item) =>
          item.textContent!.trim(),
        ),
      ).toEqual(['Volvo', 'Saab']);
    }));

    it('labels each group with its group label', fakeAsync(() => {
      create(GroupedDropdown);
      open();
      for (const group of query('nx-dropdown-group')) {
        const labelId = group.getAttribute('aria-labelledby')!;
        expect(group.getAttribute('role')).toBe('group');
        expect(group.querySelector(`[id="${labelId}"]`)).toBeTruthy();
      }
    }));

    it('selects options of every group', fakeAsync(() => {
      const testInstance = create(GroupedDropdown);
      open();
      clickOption('Saab');
      expect(testInstance.model).toBe('saab');
      expect(triggerText()).toBe('Saab');
    }));

    it('shows the label of the option of the model', fakeAsync(() => {
      const testInstance = create(GroupedDropdown);
      testInstance.model = 'volvo';
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      expect(triggerText()).toBe('Volvo');
    }));

    it('navigates across groups with the keyboard', fakeAsync(() => {
      create(GroupedDropdown);
      open();
      expect(activeLabel()).toBe('BMW');
      pressKey(DOWN_ARROW);
      pressKey(DOWN_ARROW);
      expect(activeLabel()).toBe('Volvo');
      pressKey(UP_ARROW);
      expect(activeLabel()).toBe('Audi');
    }));

    it('keeps the order of the groups for multi select', fakeAsync(() => {
      const testInstance = create(GroupedMultiSelectDropdown);
      open();
      clickOption('Saab');
      clickOption('BMW');
      expect(testInstance.model).toEqual(['bmw', 'saab']);
    }));

    it('reads groups with selector functions', fakeAsync(() => {
      create(GroupSelectorFunctionDropdown);
      open();
      expect(groupLabels()).toEqual(['GERMAN', 'SWEDISH']);
      expect(labels()).toEqual(['BMW', 'Audi', 'Volvo', 'Saab']);
    }));

    it('warns and renders an empty label when a group has no label', fakeAsync(() => {
      const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
      const testInstance = create(GroupedDropdown);
      testInstance.groups = [{ options: [{ id: 'bmw', name: 'BMW' }] } as CarGroup];
      fixture.detectChanges();
      open();
      expect(warn).toHaveBeenCalledWith('NxDropdown: Group has no label', testInstance.groups[0]);
      expect(labels()).toEqual(['BMW']);
    }));

    it('warns and skips the options of a group when they are not an array', fakeAsync(() => {
      const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
      const testInstance = create(GroupedDropdown);
      const groups = createGroups();
      (groups[0] as any).options = null;
      testInstance.groups = groups;
      fixture.detectChanges();
      open();
      expect(warn).toHaveBeenCalledWith('NxDropdown: Options of group are not an array', groups[0]);
      expect(labels()).toEqual(['Volvo', 'Saab']);
    }));

    describe('when filtering', () => {
      it('hides groups without matching options', fakeAsync(() => {
        create(GroupedDropdown);
        open();
        filter('vol');
        expect(groupLabels()).toEqual(['Swedish']);
        expect(labels()).toEqual(['Volvo']);
      }));

      it('shows all options of a group whose label matches', fakeAsync(() => {
        create(GroupedDropdown);
        open();
        filter('germ');
        expect(groupLabels()).toEqual(['German']);
        expect(labels()).toEqual(['BMW', 'Audi']);
      }));

      it('passes the group label to a custom filter function', fakeAsync(() => {
        const testInstance = create(GroupedDropdown);
        const filterFn = vi.fn<NxDropdownFilterFn>(() => true);
        testInstance.filterFn = filterFn;
        fixture.detectChanges();
        open();
        filter('x');
        expect(filterFn).toHaveBeenCalledWith('x', 'Volvo', 'Swedish');
      }));

      it('removes the divider after the last visible group', fakeAsync(() => {
        create(GroupedDropdown);
        open();
        const dividerOf = (group: Element) =>
          getComputedStyle(group.querySelector('.nx-dropdown-results__group')!, '::after').content;
        const [german, swedish] = query('nx-dropdown-group');
        expect(dividerOf(german)).not.toBe('none');
        expect(dividerOf(swedish)).toBe('none');

        filter('bmw');
        expect(dividerOf(german)).toBe('none');
      }));

      it('shows all groups again after clearing the filter', fakeAsync(() => {
        create(GroupedDropdown);
        open();
        filter('vol');
        filter('');
        expect(groupLabels()).toEqual(['German', 'Swedish']);
        expect(labels()).toEqual(['BMW', 'Audi', 'Volvo', 'Saab']);
      }));
    });
  });

  describe('content projected groups when filtering', () => {
    it('shows all items of a group whose label matches and hides empty groups', fakeAsync(() => {
      create(ContentGroupDropdown);
      open();
      filter('swed');
      expect(labels()).toEqual(['Volvo']);
      expect(query('nx-dropdown-group:not(.nx-hidden)')).toHaveLength(1);
    }));
  });

  describe('grouped with virtual scroll', () => {
    function rows(): string[] {
      return query('nx-virtual-viewport [data-virtual-index]')
        .sort((a, b) => Number(a.dataset['virtualIndex']) - Number(b.dataset['virtualIndex']))
        .map((row) =>
          row.querySelector('.nx-dropdown__virtual-group-label')
            ? `# ${row.textContent!.trim()}`
            : row.textContent!.trim(),
        );
    }

    it('renders a header row in front of each group', fakeAsync(() => {
      create(VirtualGroupedDropdown);
      open();
      expect(rows()).toEqual(['# German', 'BMW', 'Audi', '# Swedish', 'Volvo', 'Saab']);
    }));

    it('places the options below the measured height of their group header', async () => {
      TestBed.configureTestingModule({ imports: [VirtualGroupedDropdown] });
      overlayContainer = TestBed.inject(OverlayContainer);
      fixture = TestBed.createComponent(VirtualGroupedDropdown);
      fixture.autoDetectChanges();
      await fixture.whenStable();
      (fixture.nativeElement.querySelector('.nx-dropdown__container') as HTMLElement).click();
      await new Promise((resolve) => setTimeout(resolve, 100));
      await fixture.whenStable();

      const [header, firstOption] = query('nx-virtual-viewport [data-virtual-index]').sort(
        (a, b) => Number(a.dataset['virtualIndex']) - Number(b.dataset['virtualIndex']),
      );
      // The header is taller than the 44px estimate, otherwise nothing has to move.
      expect(header.offsetHeight).toBeGreaterThan(44);
      expect(firstOption.style.transform).toBe(`translateY(${header.offsetHeight}px)`);
    });

    it('separates groups with a divider', fakeAsync(() => {
      create(VirtualGroupedDropdown);
      open();
      const headers = query('.nx-dropdown__virtual-group-label');
      expect(headers.map((header) => header.classList.contains('has-divider'))).toEqual([
        false,
        true,
      ]);
    }));

    it('wraps the rendered options of each group in a named group', fakeAsync(() => {
      create(VirtualGroupedDropdown);
      open();
      const groups = query('nx-virtual-viewport [role="group"]');
      expect(groups.map((group) => group.getAttribute('aria-label'))).toEqual([
        'German',
        'Swedish',
      ]);
      expect(
        Array.from(groups[1].querySelectorAll('nx-dropdown-item')).map((item) =>
          item.textContent!.trim(),
        ),
      ).toEqual(['Volvo', 'Saab']);
    }));

    it('hides the visible group headers from assistive technology', fakeAsync(() => {
      create(VirtualGroupedDropdown);
      open();
      const headers = query('.nx-dropdown__virtual-group-label');
      expect(headers).toHaveLength(2);
      expect(headers.every((header) => header.getAttribute('aria-hidden') === 'true')).toBe(true);
    }));

    it('counts the position in the set per group', fakeAsync(() => {
      create(VirtualGroupedDropdown);
      open();
      const items = query('nx-virtual-viewport nx-dropdown-item');
      expect(items.map((item) => item.getAttribute('aria-posinset'))).toEqual(['1', '2', '1', '2']);
      expect(items.every((item) => item.getAttribute('aria-setsize') === '2')).toBe(true);
    }));

    it('keeps the rendered options when the options are replaced by equal ones', fakeAsync(() => {
      const testInstance = create(VirtualGroupedDropdown);
      open();
      const groups = query('nx-virtual-viewport [role="group"]');
      const items = query('nx-virtual-viewport nx-dropdown-item');

      testInstance.groups = createGroups();
      fixture.detectChanges();
      flush();
      fixture.detectChanges();

      query('nx-virtual-viewport [role="group"]').forEach((group, i) =>
        expect(group).toBe(groups[i]),
      );
      query('nx-virtual-viewport nx-dropdown-item').forEach((item, i) =>
        expect(item).toBe(items[i]),
      );
    }));

    it('navigates across groups and skips disabled options', fakeAsync(() => {
      const testInstance = create(VirtualGroupedDropdown);
      testInstance.selectDisabled = 'locked';
      testInstance.groups = createGroups();
      testInstance.groups[1].options[0].locked = true;
      fixture.detectChanges();
      open();
      expect(activeLabel()).toBe('BMW');
      pressKey(DOWN_ARROW);
      pressKey(DOWN_ARROW);
      expect(activeLabel()).toBe('Saab');
      pressKey(UP_ARROW);
      expect(activeLabel()).toBe('Audi');
    }));

    it('selects an option of another group with the keyboard', fakeAsync(() => {
      const testInstance = create(VirtualGroupedDropdown);
      open();
      pressKey(DOWN_ARROW);
      pressKey(DOWN_ARROW);
      pressKey(ENTER);
      expect(testInstance.model).toBe('volvo');
    }));

    it('hides the header of groups without matching options', fakeAsync(() => {
      create(VirtualGroupedDropdown);
      open();
      filter('saab');
      expect(rows()).toEqual(['# Swedish', 'Saab']);
    }));

    it('shows all options of a group whose label matches', fakeAsync(() => {
      create(VirtualGroupedDropdown);
      open();
      filter('germ');
      expect(rows()).toEqual(['# German', 'BMW', 'Audi']);
      expect(query('nx-virtual-viewport nx-dropdown-item.nx-hidden')).toHaveLength(0);
    }));

    it('starts on the first enabled option', fakeAsync(() => {
      const testInstance = create(VirtualGroupedDropdown);
      testInstance.selectDisabled = 'locked';
      testInstance.groups = createGroups();
      testInstance.groups[0].options[0].locked = true;
      fixture.detectChanges();
      open();
      expect(activeLabel()).toBe('Audi');
    }));

    it('moves to the first enabled option when filtering', fakeAsync(() => {
      const testInstance = create(VirtualGroupedDropdown);
      testInstance.selectDisabled = 'locked';
      testInstance.groups = createGroups();
      testInstance.groups[1].options[0].locked = true;
      fixture.detectChanges();
      open();
      filter('swed');
      expect(activeLabel()).toBe('Saab');
    }));

    it('has no active option when all filtered options are disabled', fakeAsync(() => {
      const testInstance = create(VirtualGroupedDropdown);
      testInstance.selectDisabled = 'locked';
      testInstance.groups = createGroups();
      testInstance.groups[1].options.forEach((option) => (option.locked = true));
      fixture.detectChanges();
      open();
      filter('swed');
      expect(activeLabel()).toBe('');
    }));

    it('passes the group label to a custom filter function', fakeAsync(() => {
      const testInstance = create(VirtualGroupedDropdown);
      const filterFn = vi.fn<NxDropdownFilterFn>(() => true);
      testInstance.filterFn = filterFn;
      fixture.detectChanges();
      open();
      filter('x');
      expect(filterFn).toHaveBeenCalledWith('x', 'Volvo', 'Swedish');
    }));

    it('scrolls to the row of an option, not to its index', fakeAsync(() => {
      const testInstance = create(VirtualGroupedDropdown);
      open();
      const scrollToIndex = vi.spyOn(testInstance.dropdown.virtualViewport()!, 'scrollToIndex');
      testInstance.dropdown.scrollToIndex(2);
      expect(scrollToIndex).toHaveBeenCalledWith(4, 'auto');
    }));
  });
});

@Component({
  selector: 'test-custom-keys-dropdown',
  template: `<nx-formfield label="Car">
    <nx-dropdown
      [options]="cars"
      selectValue="id"
      [selectLabel]="selectLabel"
      [(ngModel)]="model"
    ></nx-dropdown>
  </nx-formfield>`,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NxDropdownModule, NxFormfieldModule, FormsModule],
})
class CustomKeysDropdown extends OptionsDropdownTest {
  cars: Car[] = createCars().map((car) => ({ ...car, locked: car.id === 'audi' }));
  selectLabel = 'name';
}

@Component({
  selector: 'test-selector-function-dropdown',
  template: `<nx-formfield label="Car">
    <nx-dropdown
      #dropdownRef
      [options]="cars"
      [selectValue]="toValue"
      [selectLabel]="toLabel"
      [overlayFallbackOrigin]="dropdownRef"
      [(ngModel)]="model"
    ></nx-dropdown>
  </nx-formfield>`,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NxDropdownModule, NxFormfieldModule, FormsModule],
})
class SelectorFunctionDropdown extends OptionsDropdownTest {
  cars = createCars();
  // Typed parameters make sure `S` is inferred from `options` under strict templates.
  toValue = (car: Car) => car.name.toUpperCase();
  toLabel = (car: Car) => `${car.name} (${car.id})`;
}

@Component({
  selector: 'test-whole-object-dropdown',
  template: `<nx-formfield label="Car">
    <nx-dropdown
      [options]="cars"
      selectValue=""
      selectLabel="name"
      [(ngModel)]="model"
    ></nx-dropdown>
  </nx-formfield>`,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NxDropdownModule, NxFormfieldModule, FormsModule],
})
class WholeObjectDropdown extends OptionsDropdownTest {
  cars = createCars();
}

@Component({
  selector: 'test-no-label-dropdown',
  template: `<nx-formfield label="Number">
    <nx-dropdown [options]="options" [valueFormatter]="format" [(ngModel)]="model"></nx-dropdown>
  </nx-formfield>`,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NxDropdownModule, NxFormfieldModule, FormsModule],
})
class NoLabelDropdown extends OptionsDropdownTest {
  options = [{ value: 1 }, { value: 2 }];
  format = (value: number) => `#${value}`;
}

@Component({
  selector: 'test-disabled-options-dropdown',
  template: `<nx-formfield label="Car">
    <nx-dropdown
      [options]="cars"
      selectValue="id"
      selectLabel="name"
      selectDisabled="locked"
      [(ngModel)]="model"
    ></nx-dropdown>
  </nx-formfield>`,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NxDropdownModule, NxFormfieldModule, FormsModule],
})
class DisabledOptionsDropdown extends OptionsDropdownTest {
  cars: Car[] = createCars().map((car) => ({ ...car, locked: car.id === 'audi' }));
}

@Component({
  selector: 'test-default-disabled-dropdown',
  template: `<nx-formfield label="Number">
    <nx-dropdown
      [options]="options"
      [selectDisabled]="selectDisabled"
      [(ngModel)]="model"
    ></nx-dropdown>
  </nx-formfield>`,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NxDropdownModule, NxFormfieldModule, FormsModule],
})
class DefaultDisabledDropdown extends OptionsDropdownTest {
  options: (NxDropdownOption & { locked?: boolean })[] = [
    { value: 1, label: 'One' },
    { value: 2, label: 'Two', disabled: true },
    { value: 3, label: 'Three' },
  ];
  selectDisabled = 'disabled';
}

@Component({
  selector: 'test-default-disabled-virtual-dropdown',
  template: `<nx-formfield label="Number">
    <nx-dropdown
      [options]="options"
      virtualScroll
      [selectDisabled]="selectDisabled"
      [(ngModel)]="model"
    ></nx-dropdown>
  </nx-formfield>`,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NxDropdownModule, NxFormfieldModule, FormsModule],
})
class DefaultDisabledVirtualDropdown extends DefaultDisabledDropdown {}

@Component({
  selector: 'test-item-template-dropdown',
  template: `<nx-formfield label="Car">
    <nx-dropdown [options]="cars" selectValue="id" selectLabel="name" [(ngModel)]="model">
      <ng-template #nxDropdownItemTemplate let-id let-car="option">
        <span class="custom-item">{{ id }}: {{ car.name }}</span>
      </ng-template>
    </nx-dropdown>
  </nx-formfield>`,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NxDropdownModule, NxFormfieldModule, FormsModule],
})
class ItemTemplateDropdown extends OptionsDropdownTest {
  cars = createCars();
}

const groupedTemplate = `<nx-formfield label="Car">
  <nx-dropdown
    [options]="groups"
    grouped
    selectValue="id"
    selectLabel="name"
    [showFilter]="true"
    [filterFn]="filterFn"
    [isMultiSelect]="isMultiSelect"
    [(ngModel)]="model"
  ></nx-dropdown>
</nx-formfield>`;

@Component({
  selector: 'test-grouped-dropdown',
  template: groupedTemplate,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NxDropdownModule, NxFormfieldModule, FormsModule],
})
class GroupedDropdown extends OptionsDropdownTest {
  groups = createGroups();
  isMultiSelect = false;
  filterFn: NxDropdownFilterFn | null = null;
}

@Component({
  selector: 'test-grouped-multi-select-dropdown',
  template: groupedTemplate,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NxDropdownModule, NxFormfieldModule, FormsModule],
})
class GroupedMultiSelectDropdown extends GroupedDropdown {
  isMultiSelect = true;
  model = [];
}

@Component({
  selector: 'test-group-selector-function-dropdown',
  template: `<nx-formfield label="Car">
    <nx-dropdown
      [options]="brands"
      grouped
      [selectGroupLabel]="toGroupLabel"
      [selectGroupOptions]="toGroupOptions"
      selectValue="id"
      selectLabel="name"
      [(ngModel)]="model"
    ></nx-dropdown>
  </nx-formfield>`,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NxDropdownModule, NxFormfieldModule, FormsModule],
})
class GroupSelectorFunctionDropdown extends OptionsDropdownTest {
  brands = createGroups().map((group) => ({ country: group.label, cars: group.options }));
  toGroupLabel = (brand: { country: string }) => brand.country.toUpperCase();
  toGroupOptions = (brand: { cars: Car[] }) => brand.cars;
}

@Component({
  selector: 'test-content-group-dropdown',
  template: `<nx-formfield label="Car">
    <nx-dropdown [showFilter]="true" [(ngModel)]="model">
      <nx-dropdown-group label="German">
        <nx-dropdown-item value="BMW">BMW</nx-dropdown-item>
      </nx-dropdown-group>
      <nx-dropdown-group label="Swedish">
        <nx-dropdown-item value="Volvo">Volvo</nx-dropdown-item>
      </nx-dropdown-group>
    </nx-dropdown>
  </nx-formfield>`,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NxDropdownModule, NxFormfieldModule, FormsModule],
})
class ContentGroupDropdown extends OptionsDropdownTest {}

@Component({
  selector: 'test-virtual-grouped-dropdown',
  template: `<nx-formfield label="Car">
    <nx-dropdown
      [options]="groups"
      grouped
      virtualScroll
      selectValue="id"
      selectLabel="name"
      [selectDisabled]="selectDisabled"
      [showFilter]="true"
      [filterFn]="filterFn"
      [(ngModel)]="model"
    ></nx-dropdown>
  </nx-formfield>`,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NxDropdownModule, NxFormfieldModule, FormsModule],
})
class VirtualGroupedDropdown extends OptionsDropdownTest {
  groups = createGroups();
  selectDisabled = 'disabled';
  filterFn: NxDropdownFilterFn | null = null;
}
