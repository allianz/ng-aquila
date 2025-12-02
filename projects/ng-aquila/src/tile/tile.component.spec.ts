import { NxErrorComponent } from '@allianz/ng-aquila/base';
import { NxIconModule } from '@allianz/ng-aquila/icon';
import { NxTileGroupComponent } from '@allianz/ng-aquila/tile';
import { Component, signal, viewChild } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { NxTileComponent } from './tile.component';
import { NxTileSelectionMode } from './tile-group.component';

@Component({
  template: `<nx-tile-group
    [disabled]="groupDisabled()"
    [readonly]="groupReadonly()"
    [selectionMode]="groupSelectionMode()"
    [(value)]="groupValue"
  >
    @for (tile of tiles(); track tile.value) {
      <nx-tile
        [label]="tile.label"
        [hint]="tile.hint ?? null"
        [icon]="tile.icon"
        [disabled]="disabled()"
        [readonly]="readonly()"
        [value]="tile.value"
      />
    }
  </nx-tile-group>`,
  imports: [NxTileComponent, NxTileGroupComponent, NxIconModule],
})
class TileTestComponent {
  group = viewChild.required<NxTileGroupComponent>(NxTileGroupComponent);
  tiles = signal([
    { value: 'tile1', label: 'First Tile', hint: 'First hint', icon: 'product-auto' },
    { value: 'tile2', label: 'Second Tile', hint: 'Second hint', icon: '' },
    { value: 'tile3', label: 'Third Tile', icon: 'product-health' },
  ]);
  disabled = signal(false);
  readonly = signal(false);
  groupDisabled = signal(false);
  groupReadonly = signal(false);
  groupSelectionMode = signal<NxTileSelectionMode>('single');
  groupValue = signal<string[] | string | null>(null);
}

@Component({
  template: `<nx-tile-group [formControl]="tileControl" [selectionMode]="selectionMode()">
    @for (tile of tiles(); track tile.value) {
      <nx-tile
        [label]="tile.label"
        [hint]="tile.hint ?? null"
        [icon]="tile.icon"
        [value]="tile.value"
      />
    }
    <nx-error>This is an error</nx-error>
  </nx-tile-group>`,
  imports: [
    NxTileComponent,
    NxTileGroupComponent,
    NxIconModule,
    ReactiveFormsModule,
    NxErrorComponent,
  ],
})
class TileReactiveFormsTestComponent {
  group = viewChild.required<NxTileGroupComponent>(NxTileGroupComponent);
  tileControl = new FormControl();
  selectionMode = signal<NxTileSelectionMode>('single');
  tiles = signal([
    { value: 'tile1', label: 'First Tile', hint: 'First hint', icon: 'product-auto' },
    { value: 'tile2', label: 'Second Tile', hint: 'Second hint', icon: '' },
    { value: 'tile3', label: 'Third Tile', icon: 'product-health' },
  ]);
}

describe('NxTileComponent', () => {
  let fixture: ComponentFixture<any>;
  let testInstance: any;
  let tileInstances: NxTileComponent[];

  function createComponent<T>(component: new () => T): {
    fixture: ComponentFixture<T>;
    testInstance: T;
    tileInstances: NxTileComponent[];
  } {
    const testFixture = TestBed.createComponent(component);
    testFixture.detectChanges();
    const instance = testFixture.componentInstance;
    const tiles = testFixture.debugElement
      .queryAll(By.directive(NxTileComponent))
      .map((debugElement) => debugElement.componentInstance);

    return {
      fixture: testFixture,
      testInstance: instance,
      tileInstances: tiles,
    };
  }

  function getInputElements(): HTMLInputElement[] {
    return fixture.nativeElement.querySelectorAll('input.nx-tile__input');
  }

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [TileTestComponent, TileReactiveFormsTestComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    ({ fixture, testInstance, tileInstances } = createComponent(TileTestComponent));
  });

  it('should select tile and update group value for single select', () => {
    testInstance.groupSelectionMode.set('single');
    testInstance.groupValue.set('');
    fixture.detectChanges();
    const inputElements = getInputElements();
    expect(inputElements.length).toBeGreaterThan(0);
    inputElements[1].click();
    fixture.detectChanges();
    expect(testInstance.groupValue()).toBe('tile2');
    expect(tileInstances[1].selected()).toBeTrue();
    expect(tileInstances[0].selected()).toBeFalse();
  });

  it('should select tile and update group value for multi select', () => {
    testInstance.groupSelectionMode.set('multi');
    testInstance.groupValue.set([]);
    fixture.detectChanges();
    const inputElements = getInputElements();
    inputElements[0].click();
    fixture.detectChanges();
    inputElements[2].click();
    fixture.detectChanges();
    expect(Array.isArray(testInstance.groupValue())).toBeTrue();
    expect(testInstance.groupValue()).toContain('tile1');
    expect(testInstance.groupValue()).toContain('tile3');
    inputElements[2].click();
    fixture.detectChanges();
    expect(testInstance.groupValue()).not.toContain('tile3');
  });

  it('should not select tile or update value when readonly', () => {
    testInstance.readonly.set(true);
    testInstance.groupValue.set(null);
    fixture.detectChanges();
    const inputElements = getInputElements();
    inputElements[0].click();
    fixture.detectChanges();
    expect(testInstance.groupValue()).toBe(null);
    expect(tileInstances[0].selected()).toBeFalse();
    expect(inputElements[0].checked).toBeFalse();
  });

  it('should not select tile or update value when disabled', () => {
    testInstance.disabled.set(true);
    testInstance.groupValue.set(null);
    fixture.detectChanges();
    const inputElements = getInputElements();
    inputElements[0].click();
    fixture.detectChanges();
    expect(testInstance.groupValue()).toBe(null);
    expect(tileInstances[0].selected()).toBeFalse();
  });

  it('should update selected state when group value changes', () => {
    testInstance.groupSelectionMode.set('single');
    testInstance.groupValue.set('tile3');
    fixture.detectChanges();
    const inputElements = getInputElements();
    expect(inputElements[2].checked).toBeTrue();
    expect(tileInstances[2].selected()).toBeTrue();
    testInstance.groupValue.set('tile1');
    fixture.detectChanges();
    expect(inputElements[0].checked).toBeTrue();
    expect(tileInstances[0].selected()).toBeTrue();
  });

  describe('Angular forms integration', () => {
    beforeEach(() => {
      ({ fixture, testInstance, tileInstances } = createComponent(TileReactiveFormsTestComponent));
    });

    it('should sync form control value with tile selection in single mode', () => {
      testInstance.selectionMode.set('single');
      testInstance.tileControl.setValue('tile2');
      fixture.detectChanges();

      expect(tileInstances[1].selected()).toBeTrue();
      expect(tileInstances[0].selected()).toBeFalse();
      expect(tileInstances[2].selected()).toBeFalse();
    });

    it('should sync form control value with tile selection in multi mode', () => {
      testInstance.selectionMode.set('multi');
      testInstance.tileControl.setValue(['tile1', 'tile3']);
      fixture.detectChanges();

      expect(tileInstances[0].selected()).toBeTrue();
      expect(tileInstances[1].selected()).toBeFalse();
      expect(tileInstances[2].selected()).toBeTrue();
    });

    it('should update form control when tiles are clicked in single mode', () => {
      testInstance.selectionMode.set('single');
      fixture.detectChanges();

      const inputElements = getInputElements();
      inputElements[1].click();
      fixture.detectChanges();

      expect(testInstance.tileControl.value).toBe('tile2');
    });

    it('should update form control when tiles are clicked in multi mode', () => {
      testInstance.selectionMode.set('multi');
      testInstance.tileControl.setValue([]);
      fixture.detectChanges();

      const inputElements = getInputElements();
      inputElements[0].click();
      fixture.detectChanges();
      inputElements[2].click();
      fixture.detectChanges();

      expect(testInstance.tileControl.value).toEqual(['tile1', 'tile3']);
    });

    it('should disable tiles when form control is disabled', () => {
      testInstance.tileControl.disable();
      fixture.detectChanges();

      tileInstances.forEach((tile) => {
        expect(tile.disabled()).toBeTrue();
      });

      const inputElements = getInputElements();
      inputElements.forEach((input) => {
        expect(input.disabled).toBeTrue();
      });
    });

    it('should enable tiles when form control is enabled', () => {
      testInstance.tileControl.disable();
      fixture.detectChanges();
      testInstance.tileControl.enable();
      fixture.detectChanges();

      tileInstances.forEach((tile) => {
        expect(tile.disabled()).toBeFalse();
      });

      const inputElements = getInputElements();
      inputElements.forEach((input) => {
        expect(input.disabled).toBeFalse();
      });
    });

    it('should not update form control when disabled tiles are clicked', () => {
      testInstance.tileControl.disable();
      fixture.detectChanges();

      const inputElements = getInputElements();
      inputElements[0].click();
      fixture.detectChanges();

      expect(testInstance.tileControl.value).toBe(null);
    });

    it('should mark form control as touched when tile is clicked', () => {
      const inputElements = getInputElements();
      expect(testInstance.tileControl.touched).toBeFalse();

      inputElements[0].click();
      inputElements[0].focus();
      inputElements[0].blur();
      fixture.detectChanges();

      expect(testInstance.tileControl.touched).toBeTrue();
    });

    it('should work with form validation', () => {
      testInstance.tileControl.setValidators([Validators.required]);
      testInstance.tileControl.updateValueAndValidity();

      expect(testInstance.tileControl.invalid).toBeTrue();
      expect(testInstance.tileControl.errors?.['required']).toBeTrue();

      const inputElements = getInputElements();
      inputElements[0].click();
      fixture.detectChanges();

      expect(testInstance.tileControl.valid).toBeTrue();
      expect(testInstance.tileControl.errors).toBeNull();
    });

    it('should reset selection when form control value is set to null', () => {
      testInstance.tileControl.setValue('tile2');
      fixture.detectChanges();
      expect(tileInstances[1].selected()).toBeTrue();

      testInstance.tileControl.setValue(null);
      fixture.detectChanges();

      tileInstances.forEach((tile) => {
        expect(tile.selected()).toBeFalse();
      });
    });

    it('should handle form control value changes programmatically in multi mode', () => {
      testInstance.selectionMode.set('multi');
      testInstance.tileControl.setValue(['tile1']);
      fixture.detectChanges();

      expect(tileInstances[0].selected()).toBeTrue();
      expect(tileInstances[1].selected()).toBeFalse();

      testInstance.tileControl.setValue(['tile1', 'tile2']);
      fixture.detectChanges();

      expect(tileInstances[0].selected()).toBeTrue();
      expect(tileInstances[1].selected()).toBeTrue();
      expect(tileInstances[2].selected()).toBeFalse();
    });
  });

  describe('a11y', () => {
    describe('it should have no violations', () => {
      it('with single select', async () => {
        await expectAsync(fixture.nativeElement).toBeAccessible();
      });

      it('with multi select', async () => {
        testInstance.groupSelectionMode.set('multi');
        fixture.detectChanges();
        await expectAsync(fixture.nativeElement).toBeAccessible();
      });

      it('preselected tile', async () => {
        testInstance.groupSelectionMode.set('single');
        testInstance.groupValue.set('tile2');
        fixture.detectChanges();
        await expectAsync(fixture.nativeElement).toBeAccessible();
      });

      it('disabled', async () => {
        testInstance.disabled.set(true);
        fixture.detectChanges();
        await expectAsync(fixture.nativeElement).toBeAccessible();
      });

      it('readonly', async () => {
        testInstance.readonly.set(true);
        fixture.detectChanges();
        await expectAsync(fixture.nativeElement).toBeAccessible();
      });
    });

    it('should have aria-describedby with hint', () => {
      const tile = tileInstances[0];
      fixture.detectChanges();
      expect(tile.ariaDescribedBy()).toContain(`${tile.id}-hint`);
      expect(tile.ariaDescribedBy()).toBeTruthy();
    });

    it('should not have aria-describedby', () => {
      const tile = tileInstances[0];
      (testInstance as TileTestComponent).tiles.update((tiles) => {
        tiles[0].hint = '';
        return tiles;
      });
      fixture.detectChanges();
      expect(tile.ariaDescribedBy()).toBeFalsy();
    });

    it('should have aria-describedby with error message', () => {
      ({ fixture, testInstance, tileInstances } = createComponent(TileReactiveFormsTestComponent));
      testInstance.tileControl.markAsTouched();
      testInstance.tileControl.updateValueAndValidity();
      testInstance.tileControl.setErrors({ required: true });
      fixture.detectChanges();
      const error = fixture.debugElement.query(By.directive(NxErrorComponent));
      // the group should have the error id
      const groupElement = fixture.debugElement.query(By.directive(NxTileGroupComponent));
      expect(groupElement.nativeElement.getAttribute('aria-describedby')).toContain(
        error.componentInstance.id,
      );
      const tile = tileInstances[0];
      // the individual tiles should have the error id AND still the hint id
      expect(tile.ariaDescribedBy()).toContain(error.componentInstance.id);
      expect(tile.ariaDescribedBy()).toContain(`${tile.id}-hint`);
    });
  });
});
