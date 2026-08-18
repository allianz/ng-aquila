import { ChangeDetectionStrategy, Component, signal, viewChild } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { disabled, form, FormField, required } from '@angular/forms/signals';

import { dispatchFakeEvent } from '../cdk-test-utils';
import { NxTileComponent } from './tile.component';
import { NxTileGroupComponent } from './tile-group.component';

/**
 * Signal forms tests for `nx-tile-group`.
 *
 * The tile group is a selection CVA that self-registers its value accessor via
 * `ngControl.valueAccessor = this`. In single-select mode the model value is a single value
 * (a `string` here); in multi-select mode it is an array of values (`string[]`).
 */
@Component({
  standalone: true,
  imports: [FormField, NxTileGroupComponent, NxTileComponent],
  template: `
    <nx-tile-group selectionMode="single" [formField]="tileForm.choice">
      @for (tile of tiles; track tile.value) {
        <nx-tile [label]="tile.label" [value]="tile.value" />
      }
    </nx-tile-group>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class SingleTileHost {
  group = viewChild.required(NxTileGroupComponent);
  tiles = [
    { value: 'tile1', label: 'First Tile' },
    { value: 'tile2', label: 'Second Tile' },
    { value: 'tile3', label: 'Third Tile' },
  ];
  model = signal({ choice: '' });
  tileForm = form(this.model);
}

@Component({
  standalone: true,
  imports: [FormField, NxTileGroupComponent, NxTileComponent],
  template: `
    <nx-tile-group selectionMode="multi" [formField]="tileForm.choices">
      @for (tile of tiles; track tile.value) {
        <nx-tile [label]="tile.label" [value]="tile.value" />
      }
    </nx-tile-group>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class MultiTileHost {
  group = viewChild.required(NxTileGroupComponent);
  tiles = [
    { value: 'tile1', label: 'First Tile' },
    { value: 'tile2', label: 'Second Tile' },
    { value: 'tile3', label: 'Third Tile' },
  ];
  model = signal({ choices: [] as string[] });
  tileForm = form(this.model);
}

@Component({
  standalone: true,
  imports: [FormField, NxTileGroupComponent, NxTileComponent],
  template: `
    <nx-tile-group selectionMode="single" [formField]="tileForm.choice">
      @for (tile of tiles; track tile.value) {
        <nx-tile [label]="tile.label" [value]="tile.value" />
      }
    </nx-tile-group>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class RequiredTileHost {
  group = viewChild.required(NxTileGroupComponent);
  tiles = [
    { value: 'tile1', label: 'First Tile' },
    { value: 'tile2', label: 'Second Tile' },
  ];
  model = signal({ choice: '' });
  tileForm = form(this.model, (p) => {
    required(p.choice);
  });
}

@Component({
  standalone: true,
  imports: [FormField, NxTileGroupComponent, NxTileComponent],
  template: `
    <nx-tile-group selectionMode="single" [formField]="tileForm.choice">
      @for (tile of tiles; track tile.value) {
        <nx-tile [label]="tile.label" [value]="tile.value" />
      }
    </nx-tile-group>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class DisabledTileHost {
  group = viewChild.required(NxTileGroupComponent);
  tiles = [
    { value: 'tile1', label: 'First Tile' },
    { value: 'tile2', label: 'Second Tile' },
  ];
  model = signal({ choice: '' });
  tileForm = form(this.model, (p) => {
    disabled(p.choice);
  });
}

describe('NxTileGroupComponent signal forms', () => {
  function setup<T>(component: new () => T): {
    fixture: ComponentFixture<T>;
    host: T;
    inputs: HTMLInputElement[];
  } {
    const fixture = TestBed.createComponent(component);
    fixture.detectChanges();
    return {
      fixture,
      host: fixture.componentInstance,
      inputs: Array.from(
        fixture.nativeElement.querySelectorAll('input.nx-tile__input'),
      ) as HTMLInputElement[],
    };
  }

  function getGroupElement(fixture: ComponentFixture<unknown>): HTMLElement {
    return fixture.nativeElement.querySelector('nx-tile-group') as HTMLElement;
  }

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [SingleTileHost, MultiTileHost, RequiredTileHost, DisabledTileHost],
    }).compileComponents();
  }));

  describe('single select', () => {
    it('reflects the model value into the selected tile (model -> view)', () => {
      const { fixture, host, inputs } = setup(SingleTileHost);

      host.model.update((m) => ({ ...m, choice: 'tile2' }));
      fixture.detectChanges();

      expect(inputs[1].checked).toBeTrue();
      expect(inputs[0].checked).toBeFalse();
      expect(host.tileForm.choice().value()).toBe('tile2');
    });

    it('writes a tile click back into the form model (view -> model)', () => {
      const { fixture, host, inputs } = setup(SingleTileHost);

      expect(host.tileForm.choice().value()).toBe('');

      inputs[1].click();
      fixture.detectChanges();

      expect(host.tileForm.choice().value()).toBe('tile2');
      expect(inputs[1].checked).toBeTrue();
    });

    // The group owns the touched state of the field: it only reports touched once the focus
    // leaves the whole group, so that moving between the tiles of the group does not touch the
    // field.
    it('marks the field as touched when the focus leaves the group', () => {
      const { fixture, host } = setup(SingleTileHost);

      expect(host.tileForm.choice().touched()).toBeFalse();

      dispatchFakeEvent(getGroupElement(fixture), 'focusout');
      fixture.detectChanges();

      expect(host.tileForm.choice().touched()).toBeTrue();
    });

    it('does not mark the field as touched when a tile inside the group is blurred', () => {
      const { fixture, host, inputs } = setup(SingleTileHost);

      dispatchFakeEvent(inputs[0], 'blur');
      fixture.detectChanges();

      expect(host.tileForm.choice().touched()).toBeFalse();
    });

    it('does not mark the field as touched while the focus stays inside the group', () => {
      const { fixture, host, inputs } = setup(SingleTileHost);

      getGroupElement(fixture).dispatchEvent(
        new FocusEvent('focusout', { bubbles: true, relatedTarget: inputs[1] }),
      );
      fixture.detectChanges();

      expect(host.tileForm.choice().touched()).toBeFalse();
    });

    it('honours a required() validator on the single-select field', () => {
      const { fixture, host, inputs } = setup(RequiredTileHost);

      // empty string is treated as empty by required()
      expect(host.tileForm.choice().valid()).toBeFalse();
      expect(host.tileForm().invalid()).toBeTrue();

      inputs[0].click();
      fixture.detectChanges();

      expect(host.tileForm.choice().value()).toBe('tile1');
      expect(host.tileForm.choice().valid()).toBeTrue();
      expect(host.tileForm().invalid()).toBeFalse();
    });

    it('disables the group through a disabled() schema rule', () => {
      const { host, inputs } = setup(DisabledTileHost);

      expect(host.tileForm.choice().disabled()).toBeTrue();
      expect(host.group().disabled()).toBeTrue();
      inputs.forEach((input) => expect(input.disabled).toBeTrue());
    });

    it('does not update the model when a disabled tile is clicked', () => {
      const { fixture, host, inputs } = setup(DisabledTileHost);

      inputs[0].click();
      fixture.detectChanges();

      expect(host.tileForm.choice().value()).toBe('');
    });
  });

  describe('multi select', () => {
    it('reflects a model array into the selected tiles (model -> view)', () => {
      const { fixture, host, inputs } = setup(MultiTileHost);

      host.model.update((m) => ({ ...m, choices: ['tile1', 'tile3'] }));
      fixture.detectChanges();

      expect(inputs[0].checked).toBeTrue();
      expect(inputs[1].checked).toBeFalse();
      expect(inputs[2].checked).toBeTrue();
      expect(host.tileForm.choices().value()).toEqual(['tile1', 'tile3']);
    });

    it('adds and removes values in the model array on clicks (view -> model)', () => {
      const { fixture, host, inputs } = setup(MultiTileHost);

      expect(host.tileForm.choices().value()).toEqual([]);

      inputs[0].click();
      fixture.detectChanges();
      inputs[2].click();
      fixture.detectChanges();

      expect(host.tileForm.choices().value()).toEqual(['tile1', 'tile3']);

      // clicking a selected tile deselects it
      inputs[2].click();
      fixture.detectChanges();

      expect(host.tileForm.choices().value()).toEqual(['tile1']);
    });
  });
});
