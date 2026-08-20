import { ChangeDetectionStrategy, Component, signal, viewChild } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { form, FormField, minLength } from '@angular/forms/signals';
import { By } from '@angular/platform-browser';

import { dispatchFakeEvent, dispatchKeyboardEvent } from '../cdk-test-utils';
import { NxTaglistComponent } from './taglist.component';
import { NxTaglistModule } from './taglist.module';

/**
 * Signal forms tests for `nx-taglist`.
 *
 * The taglist is an array-of-tags CVA (`NG_VALUE_ACCESSOR`). The bound model field must be a
 * `string[]` and MUST be initialised with `[]` (never null). Because the taglist has no built-in
 * add-input, a plain text input in the host adds tags via `addTag()`, the same public API the
 * consuming app uses; the CVA propagates the new array to the form model.
 */
@Component({
  selector: 'test-basic-taglist-host',
  standalone: true,
  imports: [FormField, NxTaglistModule],
  template: `
    <input #addInput (keydown.enter)="add(addInput)" />
    <nx-taglist [formField]="tagForm.tags">empty</nx-taglist>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class BasicTaglistHost {
  taglist = viewChild.required(NxTaglistComponent);
  model = signal({ tags: [] as string[] });
  tagForm = form(this.model);

  add(input: HTMLInputElement): void {
    this.taglist().addTag(input.value);
    input.value = '';
  }
}

@Component({
  selector: 'test-prefilled-taglist-host',
  standalone: true,
  imports: [FormField, NxTaglistModule],
  template: `<nx-taglist [formField]="tagForm.tags">empty</nx-taglist>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class PrefilledTaglistHost {
  taglist = viewChild.required(NxTaglistComponent);
  // Pre-populated BEFORE the first change detection: the CVA writeValue runs during initial
  // binding setup, so the tags render on the first render without needing markForCheck. This
  // lets a view -> model removal test have real tags in the DOM to click.
  model = signal({ tags: ['foo', 'bar'] as string[] });
  tagForm = form(this.model);
}

@Component({
  selector: 'test-validated-taglist-host',
  standalone: true,
  imports: [FormField, NxTaglistModule],
  template: `<nx-taglist [formField]="tagForm.tags">empty</nx-taglist>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class ValidatedTaglistHost {
  taglist = viewChild.required(NxTaglistComponent);
  model = signal({ tags: [] as string[] });
  // `required()` treats an empty array as non-empty, so it never flags `[]`.
  // `minLength(1)` is the array-appropriate "at least one tag" validator.
  tagForm = form(this.model, (p) => {
    minLength(p.tags, 1);
  });
}

describe('NxTaglistComponent signal forms', () => {
  function setup<T>(component: new () => T): { fixture: ComponentFixture<T>; host: T } {
    const fixture = TestBed.createComponent(component);
    fixture.detectChanges();
    return { fixture, host: fixture.componentInstance };
  }

  function getTagElements(fixture: ComponentFixture<unknown>): HTMLElement[] {
    return Array.from(fixture.nativeElement.querySelectorAll('nx-tag'));
  }

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [BasicTaglistHost, PrefilledTaglistHost, ValidatedTaglistHost],
    }).compileComponents();
  }));

  it('renders the model array as tags (model -> view)', () => {
    const { fixture, host } = setup(BasicTaglistHost);

    host.model.update((m) => ({ ...m, tags: ['foo', 'bar'] }));
    fixture.detectChanges();

    const tags = getTagElements(fixture);
    expect(tags).toHaveLength(2);
    expect(tags[0].textContent?.trim()).toBe('foo');
    expect(tags[1].textContent?.trim()).toBe('bar');
    expect(host.tagForm.tags().value()).toEqual(['foo', 'bar']);
  });

  it('adds a tag via input + Enter and writes it back to the model (view -> model)', () => {
    const { fixture, host } = setup(BasicTaglistHost);

    expect(host.tagForm.tags().value()).toEqual([]);

    const addInput = fixture.nativeElement.querySelector('input') as HTMLInputElement;
    addInput.value = 'apple';
    dispatchKeyboardEvent(addInput, 'keydown', undefined, 'Enter');
    fixture.detectChanges();

    expect(host.tagForm.tags().value()).toEqual(['apple']);

    addInput.value = 'banana';
    dispatchKeyboardEvent(addInput, 'keydown', undefined, 'Enter');
    fixture.detectChanges();

    expect(host.tagForm.tags().value()).toEqual(['apple', 'banana']);
  });

  it('removes a tag via the delete button and updates the model (view -> model)', () => {
    // Use a host whose model is pre-populated before the first change detection so the tags
    // actually render (writeValue runs during initial binding, before OnPush would need a
    // markForCheck). The original test set the tags via a post-init model.update(), which never
    // rendered any <nx-tag> (the writeValue-markForCheck gap), so querying `.nx-tag__close`
    // returned undefined and the click threw "Cannot read properties of undefined". That was a
    // broken test setup, not a component bug in the removal path itself.
    const { fixture, host } = setup(PrefilledTaglistHost);

    expect(getTagElements(fixture)).toHaveLength(2);

    const closeButtons = fixture.debugElement.queryAll(By.css('.nx-tag__close'));
    closeButtons[0].nativeElement.click();
    fixture.detectChanges();

    // VIEW -> MODEL: delete() mutates the tag array and calls _onChange, which the CVA bridge
    // propagates into the form model. (The DOM re-render to one tag would additionally require
    // the markForCheck that the component omits; that gap is covered by the model -> view test.)
    expect(host.tagForm.tags().value()).toEqual(['bar']);
  });

  it('marks the field as touched on blur', () => {
    const { fixture, host } = setup(BasicTaglistHost);

    host.model.update((m) => ({ ...m, tags: ['foo'] }));
    fixture.detectChanges();

    expect(host.tagForm.tags().touched()).toBe(false);

    const taglistEl = fixture.nativeElement.querySelector('nx-taglist') as HTMLElement;
    dispatchFakeEvent(taglistEl, 'focusout');
    fixture.detectChanges();

    expect(host.tagForm.tags().touched()).toBe(true);
  });

  it('does not mark the field as touched while the focus stays inside the taglist', () => {
    const { fixture, host } = setup(PrefilledTaglistHost);

    const taglistEl = fixture.nativeElement.querySelector('nx-taglist') as HTMLElement;
    const tagEl = fixture.nativeElement.querySelector('nx-tag') as HTMLElement;
    taglistEl.dispatchEvent(new FocusEvent('focusout', { bubbles: true, relatedTarget: tagEl }));
    fixture.detectChanges();

    expect(host.tagForm.tags().touched()).toBe(false);
  });

  it('honours a minLength(1) validator on the array field', () => {
    const { fixture, host } = setup(ValidatedTaglistHost);

    // an empty array has fewer than 1 item
    expect(host.tagForm.tags().valid()).toBe(false);
    expect(host.tagForm().invalid()).toBe(true);

    host.taglist().addTag('foo');
    fixture.detectChanges();

    expect(host.tagForm.tags().value()).toEqual(['foo']);
    expect(host.tagForm.tags().valid()).toBe(true);
    expect(host.tagForm().invalid()).toBe(false);
  });
});
