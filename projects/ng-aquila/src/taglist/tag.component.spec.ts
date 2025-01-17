import { ENTER } from '@angular/cdk/keycodes';
import { Component, Directive, Injectable, Type, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { dispatchKeyboardEvent } from '../cdk-test-utils';
import { NxTagComponent } from './tag.component';
import { NxTagIntl } from './tag-intl';
import { NxTaglistModule } from './taglist.module';

@Directive({ standalone: true })
abstract class TagTest {
    @ViewChild(NxTagComponent) tagInstance!: NxTagComponent;
}

describe('NxTagComponent', () => {
    let fixture: ComponentFixture<TagTest>;
    let testInstance: TagTest;
    let tagInstance: NxTagComponent;
    let tagNativeElement: HTMLElement;

    const createTestComponent = (component: Type<TagTest>) => {
        fixture = TestBed.createComponent(component);
        fixture.detectChanges();
        testInstance = fixture.componentInstance;
        tagInstance = testInstance.tagInstance;
        tagNativeElement = fixture.nativeElement.querySelector('nx-tag');
    };

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [NxTaglistModule, BasicTag, RemovableTag, IntlTag],
        }).compileComponents();
    }));

    it('creates the Tag', () => {
        createTestComponent(BasicTag);
        expect(tagInstance).toBeTruthy();
    });

    it('should bind the value', () => {
        createTestComponent(BasicTag);
        expect(tagInstance.value).toBe('foo');
        expect(tagNativeElement.textContent?.trim()).toBe('foo');
    });

    it('should show close icon when removable is set to true', () => {
        createTestComponent(RemovableTag);
        expect(tagInstance.removable).toBeTrue();

        const closeIcon = fixture.debugElement.query(By.css('.nx-tag__close'));
        expect(closeIcon).toBeTruthy();
    });

    it('should emit (clicked) event when tag is clicked', () => {
        createTestComponent(BasicTag);
        spyOn(tagInstance.clicked, 'emit');
        fixture.debugElement.nativeElement.querySelector('nx-tag').click();
        fixture.detectChanges();
        expect(tagInstance.clicked.emit).toHaveBeenCalledWith('foo');
    });

    it('should emit a (clicked) event when the tag is keydown with ENTER', () => {
        createTestComponent(BasicTag);
        spyOn(tagInstance.clicked, 'emit');
        const tagEl = fixture.nativeElement.querySelector('nx-tag');

        dispatchKeyboardEvent(tagEl, 'keydown', ENTER);
        fixture.detectChanges();
        expect(tagInstance.clicked.emit).toHaveBeenCalledWith('foo');
    });

    it('should emit (removed) event when close icon is clicked', () => {
        createTestComponent(RemovableTag);
        spyOn(tagInstance.removed, 'emit');
        fixture.debugElement.nativeElement.querySelector('.nx-tag__close').click();
        fixture.detectChanges();
        expect(tagInstance.removed.emit).toHaveBeenCalledWith('bar');
    });

    it('should not emit (removed) event if not removable', () => {
        createTestComponent(BasicTag);
        spyOn(tagInstance.removed, 'emit');
        const tagEl = fixture.nativeElement.querySelector('nx-tag');
        dispatchKeyboardEvent(tagEl, 'keydown', ENTER);
        fixture.detectChanges();
        expect(tagInstance.removed.emit).not.toHaveBeenCalledWith('foo');

        tagEl.click();
        fixture.detectChanges();
        expect(tagInstance.removed.emit).not.toHaveBeenCalledWith('foo');
    });

    describe('programmatic change', () => {
        it('should update on value change', () => {
            createTestComponent(BasicTag);
            testInstance.tagInstance.value = 'programmatic value';
            fixture.detectChanges();
            expect(tagNativeElement.textContent?.trim()).toBe('programmatic value');
        });

        it('should update on removable change', () => {
            createTestComponent(BasicTag);
            testInstance.tagInstance.removable = true;
            fixture.detectChanges();
            let closeIcon = fixture.debugElement.query(By.css('.nx-tag__close'));
            expect(closeIcon).toBeTruthy();

            testInstance.tagInstance.removable = false;
            fixture.detectChanges();
            closeIcon = fixture.debugElement.query(By.css('.nx-tag__close'));
            expect(closeIcon).toBeFalsy();
        });
    });

    describe('a11y', () => {
        it('is a delete button for ensure a11y', () => {
            createTestComponent(RemovableTag);
            const deleteButton = fixture.nativeElement.querySelector('.nx-tag__close');
            expect(deleteButton.tagName.toLowerCase()).toBe('button');
        });

        it('should emit (removed) event when delete', () => {
            createTestComponent(RemovableTag);
            spyOn(tagInstance.removed, 'emit');
            spyOn(tagInstance.clicked, 'emit');

            const deleteButton = fixture.nativeElement.querySelector('.nx-tag__close');
            deleteButton.click();

            fixture.detectChanges();
            expect(tagInstance.removed.emit).toHaveBeenCalledWith('bar');
            expect(tagInstance.clicked.emit).not.toHaveBeenCalled();
        });

        it('has no accessibility violations', async () => {
            createTestComponent(BasicTag);
            await expectAsync(fixture.nativeElement).toBeAccessible();
        });

        it('should set aria-label of delete button', () => {
            createTestComponent(RemovableTag);
            spyOn(tagInstance.removed, 'emit');
            const deleteButton = fixture.nativeElement.querySelector('.nx-tag__close');
            expect(deleteButton.getAttribute('aria-label')).toBe('Delete tag');

            (testInstance as RemovableTag).deleteAriaLabel = 'hello';

            fixture.detectChanges();
            expect(deleteButton.getAttribute('aria-label')).toBe('hello');
        });

        it('should override the default intl', () => {
            createTestComponent(IntlTag);
            const deleteButton = fixture.nativeElement.querySelector('.nx-tag__close');
            expect(deleteButton.getAttribute('aria-label')).toBe('Custom delete aria-label');
        });
    });
});

@Component({
    template: `<nx-tag value="foo"></nx-tag>`,
    imports: [NxTaglistModule],
})
class BasicTag extends TagTest {}

@Injectable()
class MyIntl extends NxTagIntl {
    deleteAriaLabel = 'Custom delete aria-label';
}

@Component({
    template: `<nx-tag value="foo" removable="true"></nx-tag>`,
    imports: [NxTaglistModule],
    providers: [
        {
            provide: NxTagIntl,
            useClass: MyIntl,
        },
    ],
})
class IntlTag extends TagTest {}

@Component({
    template: `<nx-tag value="bar" removable="true" [deleteAriaLabel]="deleteAriaLabel"></nx-tag>`,
    imports: [NxTaglistModule],
})
class RemovableTag extends TagTest {
    deleteAriaLabel = '';
}
