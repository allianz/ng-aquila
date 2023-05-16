import { BACKSPACE, DELETE } from '@angular/cdk/keycodes';
import { ChangeDetectionStrategy, Component, Directive, Type, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { dispatchKeyboardEvent } from '../cdk-test-utils';
import { NxTaglistComponent } from './taglist.component';
import { NxTaglistModule } from './taglist.module';

@Directive()
abstract class TaglistTest {
    @ViewChild(NxTaglistComponent) taglistInstance!: NxTaglistComponent;
    tags: (string | object)[] = ['foo', 'bar'];
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
            declarations: [BasicTaglist, TaglistNoDelete, TaglistObjects, TaglistWithFormatter, AriaLabelledByTaglist, TaglistOnPush],
            imports: [NxTaglistModule],
        }).compileComponents();
    }));

    it('creates the Taglist', () => {
        createTestComponent(BasicTaglist);
        expect(taglistInstance).toBeTruthy();
    });

    it('renders given tags', () => {
        createTestComponent(BasicTaglist);

        expect(tagElements).toHaveSize(2);

        const item0 = tagElements.item(0);
        expect(item0.textContent?.trim()).toBe('foo');
        const item1 = tagElements.item(1);
        expect(item1.textContent?.trim()).toBe('bar');
    });

    it('deletes tags on delete button click', () => {
        createTestComponent(BasicTaglist);
        expect(taglistInstance.tags).toHaveSize(2);

        const closeIcons = fixture.debugElement.queryAll(By.css('.nx-tag__close'));
        closeIcons[0].nativeElement.click();
        expect(taglistInstance.tags).toHaveSize(1);
        expect(taglistInstance.tags).not.toContain('foo');
        expect(taglistInstance.tags).toContain('bar');
    });

    it('deletes tags on delete button click and focuses the next one', () => {
        createTestComponent(BasicTaglist);
        const firstTag = tagElements.item(0);
        firstTag.focus();
        dispatchKeyboardEvent(firstTag, 'keydown', DELETE);

        fixture.detectChanges();

        expect(taglistInstance.tags).toHaveSize(1);
        expect(document.activeElement).toEqual(tagElements.item(1));
    });

    it('emits event on click', () => {
        createTestComponent(BasicTaglist);
        spyOn(taglistInstance.tagClickEvent, 'emit');
        const listItems: NodeListOf<HTMLLIElement> = listNativeElement.querySelectorAll('li');
        const button: HTMLButtonElement = listItems.item(0).querySelector('nx-tag') as HTMLButtonElement;
        button.click();
        expect(taglistInstance.tagClickEvent.emit).toHaveBeenCalledWith('foo');
    });

    it('emits event on delete', () => {
        createTestComponent(BasicTaglist);
        spyOn(taglistInstance.tagsChange, 'emit');
        const listItems: NodeListOf<HTMLLIElement> = listNativeElement.querySelectorAll('li');
        const button: HTMLButtonElement = listItems.item(0).querySelector('.nx-tag__close') as HTMLButtonElement;
        button.click();
        expect(taglistInstance.tagsChange.emit).toHaveBeenCalledWith(['bar']);
    });

    it('no delete icon in list mode', () => {
        createTestComponent(TaglistNoDelete);
        expect(taglistInstance.tags).toHaveSize(2);

        const closeIcon = fixture.debugElement.query(By.css('.nx-tag__close'));
        expect(closeIcon).toBeNull();
    });

    it('can add tags', () => {
        createTestComponent(BasicTaglist);
        expect(taglistInstance.tags).toHaveSize(2);

        taglistInstance.addTag('baz');
        expect(taglistInstance.tags).toHaveSize(3);
    });

    it('cannot add duplicate tags', () => {
        createTestComponent(BasicTaglist);
        expect(taglistInstance.tags).toHaveSize(2);

        taglistInstance.addTag('foo');
        expect(taglistInstance.tags).toHaveSize(2);
    });

    it('can clear tags', () => {
        createTestComponent(BasicTaglist);
        expect(taglistInstance.tags).toHaveSize(2);

        taglistInstance.clearTags();
        expect(taglistInstance.tags).toHaveSize(0);
    });

    it('shows content as empty state', () => {
        createTestComponent(BasicTaglist);
        taglistInstance.clearTags();
        fixture.detectChanges();
        const taglistElement = fixture.debugElement.query(By.css('nx-taglist'));
        expect(taglistElement.nativeElement.textContent.trim()).toBe('empty');
    });

    it('displays label property in case input is an array of objects', () => {
        createTestComponent(TaglistObjects);
        expect(taglistInstance.tags).toHaveSize(2);

        const listItems: NodeListOf<HTMLLIElement> = listNativeElement.querySelectorAll('li');
        expect(listItems).toHaveSize(2);

        const item0 = listItems.item(0).querySelector('nx-tag');
        expect(item0?.textContent?.trim()).toBe('foo');
        const item1 = listItems.item(1).querySelector('nx-tag');
        expect(item1?.textContent?.trim()).toBe('bar');
    });

    it('can add objects as tags', () => {
        createTestComponent(TaglistObjects);
        expect(taglistInstance.tags).toHaveSize(2);

        taglistInstance.addTag({ testLabelProp: 'baz' });
        expect(taglistInstance.tags).toHaveSize(3);
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

    describe('programmatic change', () => {
        it('should update on tags change', () => {
            createTestComponent(BasicTaglist);
            testInstance.taglistInstance.tags = ['a', 'b', 'c'];
            fixture.detectChanges();
            tagElements = getTagElements();
            expect(tagElements).toHaveSize(3);
            expect(tagElements.item(0).textContent?.trim()).toBe('a');
        });

        it('should update on allowTagDeletion change', () => {
            createTestComponent(BasicTaglist);
            testInstance.taglistInstance.allowTagDeletion = false;
            fixture.detectChanges();
            expect(getCloseIcon(tagElements.item(0))).toBeFalsy();
        });

        it('should update on isKeywordList change', () => {
            createTestComponent(TaglistOnPush);
            testInstance.taglistInstance.isKeywordList = true;
            fixture.detectChanges();
            expect(fixture.nativeElement.querySelector('nx-taglist')).toHaveClass('nx-taglist--keyword');
        });

        it('should update on labelProp change', () => {
            createTestComponent(BasicTaglist);
            testInstance.taglistInstance.tags = [{ customLabelProp: 'a' }, { customLabelProp: 'b' }, { customLabelProp: 'c' }];
            fixture.detectChanges();
            tagElements = getTagElements();
            expect(tagElements.item(0).textContent?.trim()).toBe('');
            testInstance.taglistInstance.labelProperty = 'customLabelProp';
            fixture.detectChanges();
            tagElements = getTagElements();
            expect(tagElements.item(0).textContent?.trim()).toBe('a');
        });

        it('should update on labelledby change', () => {
            createTestComponent(AriaLabelledByTaglist);
            testInstance.taglistInstance.labelledby = 'taglist-headline2';
            fixture.detectChanges();
            expect(fixture.nativeElement.querySelector('nx-taglist').getAttribute('aria-labelledby')).toBe('taglist-headline2');
        });

        it('should update on valueFormatter change', () => {
            createTestComponent(AriaLabelledByTaglist);
            testInstance.taglistInstance.valueFormatter = value => `=== ${value} ===`;
            fixture.detectChanges();
            tagElements = getTagElements();
            expect(tagElements.item(0).textContent?.trim()).toBe('=== foo ===');
        });
    });

    describe('a11y', () => {
        it('emits (removed) event on BACKSPACE key pressed', () => {
            createTestComponent(BasicTaglist);
            spyOn(taglistInstance.tagsChange, 'emit');
            const tag = listNativeElement.querySelectorAll('li').item(0).querySelector('nx-tag');
            dispatchKeyboardEvent(tag as Node, 'keydown', BACKSPACE);
            expect(taglistInstance.tagsChange.emit).toHaveBeenCalledWith(['bar']);
        });

        it('emits (removed) event on DELETE key pressed', () => {
            createTestComponent(BasicTaglist);
            spyOn(taglistInstance.tagsChange, 'emit');
            const tag = listNativeElement.querySelectorAll('li').item(0).querySelector('nx-tag');
            dispatchKeyboardEvent(tag as Node, 'keydown', DELETE);
            expect(taglistInstance.tagsChange.emit).toHaveBeenCalledWith(['bar']);
        });

        it('sets aria-labelledby when bound by input property', () => {
            createTestComponent(AriaLabelledByTaglist);
            expect(fixture.nativeElement.querySelector('nx-taglist').getAttribute('aria-labelledby')).toBe('taglist-headline');
            (testInstance as AriaLabelledByTaglist).labelledBy = 'taglist-headline2';
            fixture.detectChanges();
            expect(fixture.nativeElement.querySelector('nx-taglist').getAttribute('aria-labelledby')).toBe('taglist-headline2');
        });

        it('has no accessibility violations', async () => {
            createTestComponent(BasicTaglist);
            await expectAsync(fixture.nativeElement).toBeAccessible();
        });

        it('has no accessibility violations when aria-labelledby is set', async () => {
            createTestComponent(AriaLabelledByTaglist);
            await expectAsync(fixture.nativeElement).toBeAccessible();
        });
    });
});

@Component({
    template: `<nx-taglist [tags]="tags">empty</nx-taglist>`,
})
class BasicTaglist extends TaglistTest {}

@Component({
    template: `<nx-taglist [tags]="tags" [allowTagDeletion]="false"></nx-taglist>`,
})
class TaglistNoDelete extends TaglistTest {}

@Component({
    template: `<nx-taglist [tags]="tags" labelProperty="testLabelProp"></nx-taglist>`,
})
class TaglistObjects extends TaglistTest {
    tags = [{ testLabelProp: 'foo' }, { testLabelProp: 'bar' }];
}

@Component({
    template: `<nx-taglist [tags]="tags" [valueFormatter]="myFormatter">empty</nx-taglist>`,
})
class TaglistWithFormatter extends TaglistTest {
    myFormatter = (value: any) => `my ${value}`;
}

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `<nx-taglist [tags]="tags">empty</nx-taglist>`,
})
class TaglistOnPush extends TaglistTest {}

@Component({
    template: `
        <h5 id="taglist-headline">Aria label</h5>
        <h5 id="taglist-headline2">Other label</h5>
        <nx-taglist [tags]="tags" [aria-labelledby]="labelledBy"></nx-taglist>
    `,
})
class AriaLabelledByTaglist extends TaglistTest {
    labelledBy = 'taglist-headline';
}
