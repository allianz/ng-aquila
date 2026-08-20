import { _getFocusedElementPierceShadowDom } from '@angular/cdk/platform';
import { ChangeDetectionStrategy, Component, Directive, Type, ViewChild } from '@angular/core';
import { ComponentFixture, fakeAsync, flush, TestBed, waitForAsync } from '@angular/core/testing';
import { FormControl, FormsModule, NgModel, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { dispatchFakeEvent } from '../cdk-test-utils';
import { NxTaglistComponent } from './taglist.component';
import { NxTaglistModule } from './taglist.module';

@Directive({ standalone: true })
abstract class TaglistTest {
  @ViewChild(NxTaglistComponent)
  taglistInstance!: NxTaglistComponent;
  tags: (string | object)[] = ['foo', 'bar'];
  labelProperty = 'nxTaglistLabel';
}

describe('NxTaglistComponent', () => {
  let fixture: ComponentFixture<TaglistTest>;
  let testInstance: TaglistTest;
  let taglistInstance: NxTaglistComponent;
  let listNativeElement: HTMLUListElement;
  let tagElements: NodeListOf<HTMLElement>;

  const createTestComponent = (component: Type<TaglistTest>) => {
    fixture = TestBed.createComponent(component);
    fixture.detectChanges();
    testInstance = fixture.componentInstance;
    taglistInstance = testInstance.taglistInstance;
    listNativeElement = fixture.nativeElement.querySelector('ul') as HTMLUListElement;
    tagElements = getTagElements();
  };

  function getTagElements(): NodeListOf<HTMLElement> {
    return fixture.nativeElement.querySelectorAll('nx-tag');
  }

  function getCloseIcon(tagElement: HTMLElement) {
    return tagElement.querySelector('.nx-tag__close');
  }

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        NxTaglistModule,
        BasicTaglist,
        TaglistNoDelete,
        TaglistObjects,
        TaglistWithFormatter,
        AriaLabelledByTaglist,
        KeywordTaglist,
        LabelPropertyTaglist,
        OnPushTagList,
        ReactiveFormTaglist,
        NgModelTaglist,
      ],
    }).compileComponents();
  }));

  it('creates the Taglist', () => {
    createTestComponent(BasicTaglist);
    expect(taglistInstance).toBeTruthy();
  });

  it('renders given tags', () => {
    createTestComponent(BasicTaglist);

    expect(tagElements).toHaveLength(2);

    const item0 = tagElements.item(0);
    expect(item0.textContent?.trim()).toBe('foo');
    const item1 = tagElements.item(1);
    expect(item1.textContent?.trim()).toBe('bar');
  });

  it('deletes tags on delete button click', () => {
    createTestComponent(BasicTaglist);
    expect(getTagElements()).toHaveLength(2);

    const closeIcons = fixture.debugElement.queryAll(By.css('.nx-tag__close'));
    closeIcons[0].nativeElement.click();
    fixture.detectChanges();
    const renderedTags = getTagElements();
    expect(renderedTags).toHaveLength(1);
    expect(renderedTags[0].textContent).not.toContain('foo');
    expect(renderedTags[0].textContent).toContain('bar');
  });

  it('deletes tags on delete button click and focuses the next one', () => {
    createTestComponent(BasicTaglist);
    const firstTagDeleteButton = tagElements
      .item(0)
      .querySelector('.nx-tag__close') as HTMLButtonElement;
    firstTagDeleteButton.click();
    fixture.detectChanges();

    expect(taglistInstance.tags).toHaveLength(1);
    expect(_getFocusedElementPierceShadowDom()).toEqual(tagElements.item(1));
  });

  it('deletes tags on delete button click and focuses the previous one', () => {
    createTestComponent(BasicTaglist);
    const lastTag = tagElements.item(tagElements.length - 1);
    const lastTagDeleteButton = lastTag.querySelector('.nx-tag__close') as HTMLButtonElement;
    lastTagDeleteButton.click();
    fixture.detectChanges();

    expect(taglistInstance.tags).toHaveLength(1);
    expect(_getFocusedElementPierceShadowDom()).toEqual(tagElements.item(tagElements.length - 2));
  });

  it('emits event on click', () => {
    createTestComponent(BasicTaglist);
    vi.spyOn(taglistInstance.tagClickEvent, 'emit').mockReturnValue(undefined);
    const listItems: NodeListOf<HTMLLIElement> = listNativeElement.querySelectorAll('li');
    const button: HTMLButtonElement = listItems
      .item(0)
      .querySelector('nx-tag') as HTMLButtonElement;
    button.click();
    expect(taglistInstance.tagClickEvent.emit).toHaveBeenCalledWith('foo');
  });

  it('emits event on delete', () => {
    createTestComponent(BasicTaglist);
    vi.spyOn(taglistInstance.tagsChange, 'emit').mockReturnValue(undefined);
    const listItems: NodeListOf<HTMLLIElement> = listNativeElement.querySelectorAll('li');
    const button: HTMLButtonElement = listItems
      .item(0)
      .querySelector('.nx-tag__close') as HTMLButtonElement;
    button.click();
    expect(taglistInstance.tagsChange.emit).toHaveBeenCalledWith(['bar']);
  });

  it('no delete icon in list mode', () => {
    createTestComponent(TaglistNoDelete);
    expect(getTagElements()).toHaveLength(2);

    const closeIcon = fixture.debugElement.query(By.css('.nx-tag__close'));
    expect(closeIcon).toBeNull();
  });

  it('can add tags', () => {
    createTestComponent(BasicTaglist);
    expect(getTagElements()).toHaveLength(2);

    taglistInstance.addTag('baz');
    fixture.detectChanges();
    expect(getTagElements()).toHaveLength(3);
  });

  it('can add tags when parent is OnPush', () => {
    createTestComponent(OnPushTagList);
    expect(getTagElements()).toHaveLength(2);

    taglistInstance.addTag('baz');
    fixture.detectChanges();
    expect(getTagElements()).toHaveLength(3);
  });

  it('cannot add duplicate tags', () => {
    createTestComponent(BasicTaglist);
    expect(getTagElements()).toHaveLength(2);

    taglistInstance.addTag('foo');
    fixture.detectChanges();
    expect(getTagElements()).toHaveLength(2);
  });

  it('can clear tags', () => {
    createTestComponent(BasicTaglist);
    expect(taglistInstance.tags).toHaveLength(2);
    expect(getTagElements()).toHaveLength(2);

    taglistInstance.clearTags();
    fixture.detectChanges();
    expect(taglistInstance.tags).toHaveLength(0);
    expect(getTagElements()).toHaveLength(0);
  });

  it('can clear tags when parent is OnPush', () => {
    createTestComponent(OnPushTagList);
    expect(getTagElements()).toHaveLength(2);

    taglistInstance.clearTags();
    fixture.detectChanges();
    expect(getTagElements()).toHaveLength(0);
  });

  it('shows content as empty state', () => {
    createTestComponent(BasicTaglist);
    testInstance.tags = [];
    fixture.detectChanges();
    const taglistElement = fixture.debugElement.query(By.css('nx-taglist'));
    expect(taglistElement.nativeElement.textContent.trim()).toBe('empty');
  });

  it('shows content as empty state when clearTags was called', () => {
    createTestComponent(BasicTaglist);
    taglistInstance.clearTags();
    fixture.detectChanges();
    const taglistElement = fixture.debugElement.query(By.css('nx-taglist'));
    expect(taglistElement.nativeElement.textContent.trim()).toBe('empty');
  });

  it('displays label property in case input is an array of objects', () => {
    createTestComponent(TaglistObjects);
    expect(taglistInstance.tags).toHaveLength(2);

    const listItems: NodeListOf<HTMLLIElement> = listNativeElement.querySelectorAll('li');
    expect(listItems).toHaveLength(2);

    const item0 = listItems.item(0).querySelector('nx-tag');
    expect(item0?.textContent?.trim()).toBe('foo');
    const item1 = listItems.item(1).querySelector('nx-tag');
    expect(item1?.textContent?.trim()).toBe('bar');
  });

  it('can add objects as tags', () => {
    createTestComponent(TaglistObjects);
    expect(taglistInstance.tags).toHaveLength(2);

    taglistInstance.addTag({ testLabelProp: 'baz' });
    fixture.detectChanges();
    expect(taglistInstance.tags).toHaveLength(3);
    expect(getTagElements()).toHaveLength(3);
    expect(taglistInstance.tags[2].testLabelProp).toBe('baz');
  });

  it('allows custom tag formatting', () => {
    createTestComponent(TaglistWithFormatter);

    const listItems: NodeListOf<HTMLLIElement> = listNativeElement.querySelectorAll('li');

    const item0 = listItems.item(0).querySelector('nx-tag');
    expect(item0?.textContent?.trim()).toBe('my foo');
    const item1 = listItems.item(1).querySelector('nx-tag');
    expect(item1?.textContent?.trim()).toBe('my bar');
  });

  it('should set keyword class', () => {
    createTestComponent(KeywordTaglist);
    testInstance.taglistInstance.isKeywordList = true;
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('nx-taglist')).toHaveClass('nx-taglist--keyword');
  });

  it('should update on labelProp change', () => {
    createTestComponent(LabelPropertyTaglist);
    testInstance.tags = [
      { customLabelProp: 'a' },
      { customLabelProp: 'b' },
      { customLabelProp: 'c' },
    ];
    fixture.detectChanges();
    tagElements = getTagElements();
    expect(tagElements.item(0).textContent?.trim()).toBe('');
    testInstance.labelProperty = 'customLabelProp';
    fixture.detectChanges();
    tagElements = getTagElements();
    expect(tagElements.item(0).textContent?.trim()).toBe('a');
  });

  describe('forms', () => {
    it('marks the control as touched on blur with reactive forms', () => {
      createTestComponent(ReactiveFormTaglist);
      const control = (testInstance as ReactiveFormTaglist).control;

      expect(control.touched).toBe(false);

      const taglistElement = fixture.nativeElement.querySelector('nx-taglist') as HTMLElement;
      dispatchFakeEvent(taglistElement, 'focusout');
      fixture.detectChanges();

      expect(control.touched).toBe(true);
    });

    it('marks the control as touched on blur with template driven forms', fakeAsync(() => {
      createTestComponent(NgModelTaglist);
      flush();
      const ngModel = (testInstance as NgModelTaglist).ngModel;

      expect(ngModel.touched).toBe(false);

      const taglistElement = fixture.nativeElement.querySelector('nx-taglist') as HTMLElement;
      dispatchFakeEvent(taglistElement, 'focusout');
      fixture.detectChanges();
      flush();

      expect(ngModel.touched).toBe(true);
    }));

    it('does not mark the control as touched while the focus stays inside the taglist', () => {
      createTestComponent(ReactiveFormTaglist);
      const control = (testInstance as ReactiveFormTaglist).control;

      const taglistElement = fixture.nativeElement.querySelector('nx-taglist') as HTMLElement;
      const tagElement = fixture.nativeElement.querySelector('nx-tag') as HTMLElement;
      taglistElement.dispatchEvent(
        new FocusEvent('focusout', { bubbles: true, relatedTarget: tagElement }),
      );
      fixture.detectChanges();

      expect(control.touched).toBe(false);
    });

    it('renders the empty state when the form writes a null value', () => {
      createTestComponent(ReactiveFormTaglist);
      expect(getTagElements()).toHaveLength(2);

      // Angular forms pass null for a reset control; writeValue maps it to an empty array so the
      // template does not throw on `tags.length`.
      (testInstance as ReactiveFormTaglist).control.reset();
      fixture.detectChanges();

      expect(taglistInstance.tags).toEqual([]);
      expect(getTagElements()).toHaveLength(0);
    });
  });

  describe('a11y', () => {
    it('emits (removed) event on delete', () => {
      createTestComponent(BasicTaglist);
      vi.spyOn(taglistInstance.tagsChange, 'emit').mockReturnValue(undefined);
      const tag = listNativeElement
        .querySelectorAll('li')
        .item(0)
        .querySelector('.nx-tag__close') as HTMLButtonElement;
      tag.click();
      expect(taglistInstance.tagsChange.emit).toHaveBeenCalledWith(['bar']);
    });

    it('sets aria-labelledby when bound by input property', () => {
      createTestComponent(AriaLabelledByTaglist);
      expect(
        fixture.nativeElement.querySelector('nx-taglist').getAttribute('aria-labelledby'),
      ).toBe('taglist-headline');
      (testInstance as AriaLabelledByTaglist).labelledBy = 'taglist-headline2';
      fixture.detectChanges();
      expect(
        fixture.nativeElement.querySelector('nx-taglist').getAttribute('aria-labelledby'),
      ).toBe('taglist-headline2');
    });

    it('has no accessibility violations', async () => {
      createTestComponent(BasicTaglist);
      await expect(fixture.nativeElement).toBeAccessible();
    });

    it('has no accessibility violations when aria-labelledby is set', async () => {
      createTestComponent(AriaLabelledByTaglist);
      await expect(fixture.nativeElement).toBeAccessible();
    });

    it('has role button in taglist when not removable', () => {
      createTestComponent(TaglistNoDelete);
      const tags = getTagElements();
      expect(tags[0].getAttribute('role')).toBe('button');
    });

    it('does have role group in taglist when removable', () => {
      createTestComponent(BasicTaglist);
      const tags = getTagElements();
      expect(tags[0].getAttribute('role')).toBe('group');
    });
  });
});

@Component({
  selector: 'test-basic-taglist',
  template: `<nx-taglist [tags]="tags">empty</nx-taglist>`,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NxTaglistModule],
})
class BasicTaglist extends TaglistTest {}

@Component({
  selector: 'test-on-push-tag-list',
  template: `<nx-taglist [tags]="tags">empty</nx-taglist
    ><button id="testButton" (click)="addTag()">Click</button>`,
  imports: [NxTaglistModule],
})
class OnPushTagList extends TaglistTest {
  addTag() {
    this.taglistInstance.addTag('added-from-button');
  }
}

@Component({
  selector: 'test-label-property-taglist',
  template: `<nx-taglist [tags]="tags" [labelProperty]="labelProperty">empty</nx-taglist>`,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NxTaglistModule],
})
class LabelPropertyTaglist extends TaglistTest {}

@Component({
  selector: 'test-taglist-no-delete',
  template: `<nx-taglist [tags]="tags" [allowTagDeletion]="false"></nx-taglist>`,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NxTaglistModule],
})
class TaglistNoDelete extends TaglistTest {}

@Component({
  selector: 'test-taglist-objects',
  template: `<nx-taglist [tags]="tags" labelProperty="testLabelProp"></nx-taglist>`,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NxTaglistModule],
})
class TaglistObjects extends TaglistTest {
  tags = [{ testLabelProp: 'foo' }, { testLabelProp: 'bar' }];
}

@Component({
  selector: 'test-taglist-with-formatter',
  template: `<nx-taglist [tags]="tags" [valueFormatter]="myFormatter">empty</nx-taglist>`,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NxTaglistModule],
})
class TaglistWithFormatter extends TaglistTest {
  myFormatter = (value: any) => `my ${value}`;
}

@Component({
  selector: 'test-aria-labelled-by-taglist',
  template: `
    <h5 id="taglist-headline">Aria label</h5>
    <h5 id="taglist-headline2">Other label</h5>
    <nx-taglist [tags]="tags" [aria-labelledby]="labelledBy"></nx-taglist>
  `,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NxTaglistModule],
})
class AriaLabelledByTaglist extends TaglistTest {
  labelledBy = 'taglist-headline';
}

@Component({
  selector: 'test-keyword-taglist',
  template: ` <nx-taglist [tags]="tags" isKeywordList></nx-taglist> `,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NxTaglistModule],
})
class KeywordTaglist extends TaglistTest {}

@Component({
  selector: 'test-reactive-form-taglist',
  template: `<nx-taglist [formControl]="control">empty</nx-taglist>`,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NxTaglistModule, ReactiveFormsModule],
})
class ReactiveFormTaglist extends TaglistTest {
  control = new FormControl<(string | object)[]>(this.tags);
}

@Component({
  selector: 'test-ng-model-taglist',
  template: `<nx-taglist [(ngModel)]="tags">empty</nx-taglist>`,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NxTaglistModule, FormsModule],
})
class NgModelTaglist extends TaglistTest {
  @ViewChild(NgModel) ngModel!: NgModel;
}
