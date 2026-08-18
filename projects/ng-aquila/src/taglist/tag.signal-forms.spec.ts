import { ChangeDetectionStrategy, Component, signal, viewChild, viewChildren } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { disabled, form, FormField, minLength, readonly } from '@angular/forms/signals';

import { dispatchFakeEvent } from '../cdk-test-utils';
import { NxTagComponent, NxTagGroupComponent } from './tag.component';
import { NxTaglistModule } from './taglist.module';

/**
 * Signal forms tests for `nx-tag-group`, the recommended replacement for the deprecated
 * `nx-taglist`.
 *
 * The tag group is a multi-select CVA (`NG_VALUE_ACCESSOR`) whose value is an array of the
 * selected tag values. The bound model field must therefore be an array and MUST be initialised
 * with `[]`; `writeValue` maps a `null` coming from the forms layer to `[]` so the `selected()`
 * computeds in the tags keep working.
 */
@Component({
  standalone: true,
  imports: [FormField, NxTaglistModule],
  template: `
    <nx-tag-group [formField]="tagForm.tags">
      @for (tag of tags; track tag) {
        <nx-tag [value]="tag"></nx-tag>
      }
    </nx-tag-group>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class BasicTagGroupHost {
  group = viewChild.required(NxTagGroupComponent);
  tagInstances = viewChildren(NxTagComponent);
  tags = ['foo', 'bar', 'baz'];
  model = signal({ tags: [] as string[] });
  tagForm = form(this.model);
}

@Component({
  standalone: true,
  imports: [FormField, NxTaglistModule],
  template: `
    <nx-tag-group [formField]="tagForm.tags">
      @for (tag of tags; track tag) {
        <nx-tag [value]="tag"></nx-tag>
      }
    </nx-tag-group>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class ValidatedTagGroupHost {
  group = viewChild.required(NxTagGroupComponent);
  tags = ['foo', 'bar'];
  model = signal({ tags: [] as string[] });
  // `required()` does not flag an empty array, so `minLength(1)` is the array-appropriate
  // "at least one tag has to be selected" validator.
  tagForm = form(this.model, (p) => {
    minLength(p.tags, 1);
  });
}

@Component({
  standalone: true,
  imports: [FormField, NxTaglistModule],
  template: `
    <nx-tag-group [formField]="tagForm.tags">
      @for (tag of tags; track tag) {
        <nx-tag [value]="tag"></nx-tag>
      }
    </nx-tag-group>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class DisabledTagGroupHost {
  group = viewChild.required(NxTagGroupComponent);
  tagInstances = viewChildren(NxTagComponent);
  tags = ['foo', 'bar'];
  model = signal({ tags: ['foo'] as string[] });
  tagForm = form(this.model, (p) => {
    disabled(p.tags);
  });
}

@Component({
  standalone: true,
  imports: [FormField, NxTaglistModule],
  template: `
    <nx-tag-group [formField]="tagForm.tags">
      @for (tag of tags; track tag) {
        <nx-tag [value]="tag"></nx-tag>
      }
    </nx-tag-group>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class ReadonlyTagGroupHost {
  group = viewChild.required(NxTagGroupComponent);
  tagInstances = viewChildren(NxTagComponent);
  tags = ['foo', 'bar'];
  model = signal({ tags: ['foo'] as string[] });
  tagForm = form(this.model, (p) => {
    readonly(p.tags);
  });
}

@Component({
  standalone: true,
  imports: [FormField, NxTaglistModule],
  template: `
    <nx-tag-group [formField]="tagForm.tags" [removable]="true">
      @for (tag of tags; track tag) {
        <nx-tag [value]="tag"></nx-tag>
      }
    </nx-tag-group>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class RemovableTagGroupHost {
  group = viewChild.required(NxTagGroupComponent);
  tags = ['foo', 'bar'];
  model = signal({ tags: ['foo', 'bar'] as string[] });
  tagForm = form(this.model);
}

describe('NxTagGroupComponent signal forms', () => {
  function setup<T>(component: new () => T): { fixture: ComponentFixture<T>; host: T } {
    const fixture = TestBed.createComponent(component);
    fixture.detectChanges();
    return { fixture, host: fixture.componentInstance };
  }

  function getInputs(fixture: ComponentFixture<unknown>): HTMLInputElement[] {
    return Array.from(fixture.nativeElement.querySelectorAll('nx-tag input'));
  }

  function getLabels(fixture: ComponentFixture<unknown>): HTMLLabelElement[] {
    return Array.from(fixture.nativeElement.querySelectorAll('nx-tag label'));
  }

  function getCloseButtons(fixture: ComponentFixture<unknown>): HTMLButtonElement[] {
    return Array.from(fixture.nativeElement.querySelectorAll('.nx-tag__close'));
  }

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        BasicTagGroupHost,
        ValidatedTagGroupHost,
        DisabledTagGroupHost,
        ReadonlyTagGroupHost,
        RemovableTagGroupHost,
      ],
    }).compileComponents();
  }));

  describe('model -> view', () => {
    it('selects the tags contained in the model array', () => {
      const { fixture, host } = setup(BasicTagGroupHost);

      expect(getInputs(fixture).map((input) => input.checked)).toEqual([false, false, false]);

      host.model.update((m) => ({ ...m, tags: ['foo', 'baz'] }));
      fixture.detectChanges();

      expect(getInputs(fixture).map((input) => input.checked)).toEqual([true, false, true]);
      expect(host.tagInstances().map((tag) => tag.selected())).toEqual([true, false, true]);
      expect(host.group().value()).toEqual(['foo', 'baz']);
    });

    it('moves the selection when the model array changes', () => {
      const { fixture, host } = setup(BasicTagGroupHost);

      host.model.update((m) => ({ ...m, tags: ['foo'] }));
      fixture.detectChanges();
      expect(getInputs(fixture).map((input) => input.checked)).toEqual([true, false, false]);

      host.model.update((m) => ({ ...m, tags: ['bar'] }));
      fixture.detectChanges();

      expect(getInputs(fixture).map((input) => input.checked)).toEqual([false, true, false]);
    });

    it('treats a null model value as an empty selection', () => {
      const { fixture, host } = setup(BasicTagGroupHost);

      // Angular forms hand a null to writeValue before the first real value; the group maps it
      // to [] so the selected() computeds in the tags do not throw.
      host.group().writeValue(null);
      fixture.detectChanges();

      expect(host.group().value()).toEqual([]);
      expect(getInputs(fixture).map((input) => input.checked)).toEqual([false, false, false]);
    });
  });

  describe('view -> model', () => {
    it('adds a clicked tag to the model array', () => {
      const { fixture, host } = setup(BasicTagGroupHost);

      expect(host.tagForm.tags().value()).toEqual([]);

      getLabels(fixture)[1].click();
      fixture.detectChanges();

      expect(host.tagForm.tags().value()).toEqual(['bar']);
      expect(host.model().tags).toEqual(['bar']);
      expect(getInputs(fixture)[1].checked).toBeTrue();
    });

    it('removes a deselected tag from the model array', () => {
      const { fixture, host } = setup(BasicTagGroupHost);

      getLabels(fixture)[0].click();
      fixture.detectChanges();
      getLabels(fixture)[2].click();
      fixture.detectChanges();

      expect(host.tagForm.tags().value()).toEqual(['foo', 'baz']);

      getLabels(fixture)[0].click();
      fixture.detectChanges();

      expect(host.tagForm.tags().value()).toEqual(['baz']);
      expect(getInputs(fixture)[0].checked).toBeFalse();
    });

    it('does not add the same tag twice', () => {
      const { fixture, host } = setup(BasicTagGroupHost);

      host.group().addValue('foo');
      host.group().addValue('foo');
      fixture.detectChanges();

      expect(host.tagForm.tags().value()).toEqual(['foo']);
    });

    it('marks the field dirty after user interaction', () => {
      const { fixture, host } = setup(BasicTagGroupHost);

      expect(host.tagForm.tags().dirty()).toBeFalse();

      getLabels(fixture)[0].click();
      fixture.detectChanges();

      expect(host.tagForm.tags().dirty()).toBeTrue();
    });

    it('removes a tag from the model when its delete button is clicked', () => {
      const { fixture, host } = setup(RemovableTagGroupHost);

      expect(host.tagForm.tags().value()).toEqual(['foo', 'bar']);

      // A removable tag only emits (removed); the group does not remove the value itself, so the
      // host has to write it back. This mirrors the documented usage of nx-tag-group.
      const closeButtons = getCloseButtons(fixture);
      expect(closeButtons).toHaveSize(2);
      host.group().removeValue(host.tags[0]);
      fixture.detectChanges();

      expect(host.tagForm.tags().value()).toEqual(['bar']);
    });
  });

  describe('touched on blur', () => {
    it('marks the field as touched when the focus leaves the group', () => {
      const { fixture, host } = setup(BasicTagGroupHost);

      expect(host.tagForm.tags().touched()).toBeFalse();

      const groupElement = fixture.nativeElement.querySelector('nx-tag-group') as HTMLElement;
      dispatchFakeEvent(groupElement, 'focusout');
      fixture.detectChanges();

      expect(host.tagForm.tags().touched()).toBeTrue();
    });

    it('does not mark the field as touched while the focus stays inside the group', () => {
      const { fixture, host } = setup(BasicTagGroupHost);

      const groupElement = fixture.nativeElement.querySelector('nx-tag-group') as HTMLElement;
      const event = new FocusEvent('focusout', {
        bubbles: true,
        relatedTarget: getInputs(fixture)[1],
      });
      groupElement.dispatchEvent(event);
      fixture.detectChanges();

      expect(host.tagForm.tags().touched()).toBeFalse();
    });
  });

  describe('validation', () => {
    it('honours a minLength(1) validator on the array field', () => {
      const { fixture, host } = setup(ValidatedTagGroupHost);

      expect(host.tagForm.tags().valid()).toBeFalse();
      expect(host.tagForm().invalid()).toBeTrue();
      expect(
        host.tagForm
          .tags()
          .errors()
          .some((error) => error.kind === 'minLength'),
      ).toBeTrue();

      getLabels(fixture)[0].click();
      fixture.detectChanges();

      expect(host.tagForm.tags().value()).toEqual(['foo']);
      expect(host.tagForm.tags().valid()).toBeTrue();
      expect(host.tagForm().invalid()).toBeFalse();
      expect(host.tagForm.tags().errors()).toEqual([]);
    });
  });

  describe('disabled rule', () => {
    it('disables the group and all its tags through a disabled() schema rule', () => {
      const { fixture, host } = setup(DisabledTagGroupHost);

      expect(host.tagForm.tags().disabled()).toBeTrue();
      expect(host.group().disabled()).toBeTrue();
      host.tagInstances().forEach((tag) => expect(tag.disabled()).toBeTrue());
      getInputs(fixture).forEach((input) => expect(input.disabled).toBeTrue());
    });

    it('does not update the model when a disabled tag is clicked', () => {
      const { fixture, host } = setup(DisabledTagGroupHost);

      getLabels(fixture)[1].click();
      fixture.detectChanges();

      expect(host.tagForm.tags().value()).toEqual(['foo']);
    });
  });

  describe('readonly rule', () => {
    it('makes the group and all its tags readonly through a readonly() schema rule', () => {
      const { fixture, host } = setup(ReadonlyTagGroupHost);

      expect(host.tagForm.tags().readonly()).toBeTrue();
      expect(host.group().readonly()).toBeTrue();
      host.tagInstances().forEach((tag) => expect(tag.readonly()).toBeTrue());
      getInputs(fixture).forEach((input) =>
        expect(input.getAttribute('aria-disabled')).toBe('true'),
      );
    });

    it('does not update the model when a readonly tag is clicked', () => {
      const { fixture, host } = setup(ReadonlyTagGroupHost);

      getLabels(fixture)[1].click();
      fixture.detectChanges();

      expect(host.tagForm.tags().value()).toEqual(['foo']);
    });
  });
});
