import { Component, Directive, Injectable, signal, Type, viewChild, viewChildren } from '@angular/core';
import { ComponentFixture, fakeAsync, flush, TestBed, waitForAsync } from '@angular/core/testing';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { NxAbstractControl } from '@aposin/ng-aquila/shared';

import { dispatchKeyboardEvent } from '../cdk-test-utils';
import { NxTagComponent, NxTagGroupComponent } from './tag.component';
import { NxTagIntl } from './tag-intl';
import { NxTaglistModule } from './taglist.module';

@Directive({ standalone: true })
abstract class TagTest {
    tagInstance = viewChild.required(NxTagComponent);
    tagInstances = viewChildren(NxTagComponent);
    tagGroupInstance = viewChild.required(NxTagGroupComponent);
    abstractControl = viewChild(NxAbstractControl);
    tags = signal(['foo', 'bar', 'baz']);
    value = signal(['foo']);
}

describe('NxTagComponent', () => {
    let fixture: ComponentFixture<TagTest>;
    let testInstance: TagTest;
    let tagNativeElement: HTMLElement;

    const createTestComponent = (component: Type<TagTest>) => {
        fixture = TestBed.createComponent(component);
        fixture.detectChanges();
        testInstance = fixture.componentInstance;
        tagNativeElement = fixture.nativeElement.querySelector('nx-tag');
    };

    function getLabelElementByIndex(index: number) {
        return fixture.nativeElement.querySelectorAll('nx-tag')[index].querySelector('label');
    }

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [
                NxTaglistModule,
                FormsModule,
                BasicTag,
                RemovableTag,
                IntlTag,
                TagInGroup,
                TagInGroupDisabled,
                TagInGroupReadonly,
                TagInGroupRemovable,
                TagInGroupWithNgModel,
                TagInGroupWithFormControl,
                TagInGroupRemovableContentProjection,
                TagInGroupContentProjection,
            ],
        }).compileComponents();
    }));

    describe('standalone', () => {
        it('creates the Tag', () => {
            createTestComponent(BasicTag);
            expect(testInstance.tagInstance()).toBeTruthy();
        });

        it('should bind the value', () => {
            createTestComponent(BasicTag);
            expect(testInstance.tagInstance().value()).toBe('foo');
            expect(tagNativeElement.textContent?.trim()).toBe('foo');
        });

        it('should show close icon when removable is set to true', () => {
            createTestComponent(RemovableTag);
            expect(testInstance.tagInstance().removable()).toBeTrue();

            const closeIcon = fixture.debugElement.query(By.css('.nx-tag__close'));
            expect(closeIcon).toBeTruthy();
        });

        it('should emit (clicked) event when tag is clicked', () => {
            createTestComponent(BasicTag);
            spyOn(testInstance.tagInstance().clicked, 'emit');
            fixture.debugElement.nativeElement.querySelector('nx-tag').click();
            fixture.detectChanges();
            expect(testInstance.tagInstance().clicked.emit).toHaveBeenCalledWith('foo');
        });

        it('should emit a (clicked) event when the tag is keydown with ENTER', () => {
            createTestComponent(BasicTag);
            spyOn(testInstance.tagInstance().clicked, 'emit');
            const tagEl = fixture.nativeElement.querySelector('nx-tag');
            dispatchKeyboardEvent(tagEl, 'keydown', undefined, 'enter');
            fixture.detectChanges();
            expect(testInstance.tagInstance().clicked.emit).toHaveBeenCalledWith('foo');
        });

        it('should emit (removed) event when close icon is clicked', () => {
            createTestComponent(RemovableTag);
            spyOn(testInstance.tagInstance().removed, 'emit');
            fixture.debugElement.nativeElement.querySelector('.nx-tag__close').click();
            fixture.detectChanges();
            expect(testInstance.tagInstance().removed.emit).toHaveBeenCalledWith('bar');
        });

        it('should not emit (removed) event if not removable', () => {
            createTestComponent(BasicTag);
            spyOn(testInstance.tagInstance().removed, 'emit');
            const tagEl = fixture.nativeElement.querySelector('nx-tag');
            dispatchKeyboardEvent(tagEl, 'keydown', undefined, 'enter');
            fixture.detectChanges();
            expect(testInstance.tagInstance().removed.emit).not.toHaveBeenCalledWith('foo');

            tagEl.click();
            fixture.detectChanges();
            expect(testInstance.tagInstance().removed.emit).not.toHaveBeenCalledWith('foo');
        });

        describe('a11y', () => {
            it('is a delete button for ensure a11y', () => {
                createTestComponent(RemovableTag);
                const deleteButton = fixture.nativeElement.querySelector('.nx-tag__close');
                expect(deleteButton.tagName.toLowerCase()).toBe('button');
            });

            it('should emit (removed) event when delete', () => {
                createTestComponent(RemovableTag);
                spyOn(testInstance.tagInstance().removed, 'emit');
                spyOn(testInstance.tagInstance().clicked, 'emit');

                const deleteButton = fixture.nativeElement.querySelector('.nx-tag__close');
                deleteButton.click();

                fixture.detectChanges();
                expect(testInstance.tagInstance().removed.emit).toHaveBeenCalledWith('bar');
                expect(testInstance.tagInstance().clicked.emit).not.toHaveBeenCalled();
            });

            it('has no accessibility violations', async () => {
                createTestComponent(BasicTag);
                await expectAsync(fixture.nativeElement).toBeAccessible();
            });

            it('should set aria-label of delete button', () => {
                createTestComponent(RemovableTag);
                spyOn(testInstance.tagInstance().removed, 'emit');
                const deleteButton = fixture.nativeElement.querySelector('.nx-tag__close');
                expect(deleteButton.getAttribute('aria-label')).toBe('Delete tag');

                (testInstance as RemovableTag).deleteAriaLabel.set('hello');

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

    describe('inside tag group', () => {
        it('should create the tag group and tag', () => {
            createTestComponent(TagInGroup);
            expect(testInstance.tagGroupInstance()).toBeTruthy();
            expect(testInstance.tagInstances()?.length > 0).toBeTruthy();
        });

        it('should render the value if no content projection is used', () => {
            createTestComponent(TagInGroup);
            expect(tagNativeElement.textContent?.trim()).toBe('foo');
        });

        it('should show custom content', () => {
            createTestComponent(TagInGroupContentProjection);
            expect(fixture.nativeElement.querySelectorAll('nx-tag')[0].textContent.trim()).toBe('foo 123');
        });

        it('should select tag from value in the tag group', () => {
            createTestComponent(TagInGroup);
            expect(testInstance.tagInstances()[0].selected()).toBeTrue();
        });

        it('should toggle selection state when clicked', () => {
            createTestComponent(TagInGroup);
            getLabelElementByIndex(0).click();
            fixture.detectChanges();
            expect(testInstance.tagGroupInstance().value()).toEqual([]);
            getLabelElementByIndex(0).click();
            fixture.detectChanges();
            expect(testInstance.tagGroupInstance().value()).toEqual(['foo']);
        });

        it('should not toggle selection state when disabled', () => {
            createTestComponent(TagInGroupDisabled);
            tagNativeElement.click();
            fixture.detectChanges();
            expect(testInstance.tagGroupInstance().value()).toEqual(['foo']);
        });

        it('should not toggle selection state when readonly', () => {
            createTestComponent(TagInGroupReadonly);
            getLabelElementByIndex(0).click();
            fixture.detectChanges();
            expect(testInstance.tagGroupInstance().value()).toEqual(['foo']);
        });

        it('should prevent default and not toggle native input checked when readonly', () => {
            createTestComponent(TagInGroupReadonly);
            testInstance.value.set([]);
            fixture.detectChanges();
            const event = new MouseEvent('click', { bubbles: true, cancelable: true });
            const inputElement = fixture.nativeElement.querySelector('input');
            inputElement.dispatchEvent(event);
            fixture.detectChanges();
            expect(inputElement.checked).toBeFalse();
            expect(event.defaultPrevented).toBeTrue();
        });

        it('should inherit removable property from tag group', () => {
            createTestComponent(TagInGroupRemovable);
            expect(testInstance.tagInstances()?.[0]?.removable()).toBeTrue();
        });

        it('should inherit disabled property from tag group', () => {
            createTestComponent(TagInGroupDisabled);
            expect(testInstance.tagInstances()?.[0]?.disabled()).toBeTrue();
        });

        it('should show custom content when removable', () => {
            createTestComponent(TagInGroupRemovableContentProjection);
            expect(fixture.nativeElement.querySelectorAll('nx-tag')[0].textContent.trim()).toBe('foo 123');
        });

        it('should be disabled through form control', () => {
            createTestComponent(TagInGroupWithFormControl);
            (testInstance as TagInGroupWithFormControl).control.disable();
            fixture.detectChanges();
            expect(testInstance.tagGroupInstance().disabled()).toBeTrue();
            expect(testInstance.tagInstances()[0].disabled()).toBeTrue();
            expect(testInstance.tagInstances()[1].disabled()).toBeTrue();
            (testInstance as TagInGroupWithFormControl).control.enable();
            fixture.detectChanges();
            expect(testInstance.tagGroupInstance().disabled()).toBeFalse();
            expect(testInstance.tagInstances()[0].disabled()).toBeFalse();
            expect(testInstance.tagInstances()[1].disabled()).toBeFalse();
        });

        it('should be readonly through NxAbstractControl', () => {
            createTestComponent(TagInGroup);
            testInstance.abstractControl()?.setReadonly(true);
            fixture.detectChanges();
            expect(testInstance.tagGroupInstance().readonly()).toBeTrue();
            expect(testInstance.tagInstances()[0].readonly()).toBeTrue();
        });

        it('should inherit readonly property from tag group', () => {
            createTestComponent(TagInGroupReadonly);
            expect(testInstance.tagInstances()?.[0]?.readonly()).toBeTrue();
        });

        it('should update selected tag when value changes', () => {
            createTestComponent(TagInGroup);
            testInstance.value.set(['bar']);
            fixture.detectChanges();
            expect(testInstance.tagInstances()[0].selected()).toBeFalse();
            expect(testInstance.tagInstances()[1].selected()).toBeTrue();
        });

        it('should update selected tag when value changes through forms', fakeAsync(() => {
            createTestComponent(TagInGroupWithNgModel);
            testInstance.value.set(['bar']);
            fixture.detectChanges();
            flush();
            expect(testInstance.tagInstances()[0].selected()).toBeFalse();
            expect(testInstance.tagInstances()[1].selected()).toBeTrue();
        }));

        describe('a11y', () => {
            it('should have no accessibility violations', async () => {
                createTestComponent(TagInGroup);
                await expectAsync(fixture.nativeElement).toBeAccessible();
            });

            it('should have no accessibility violations with removable', async () => {
                createTestComponent(TagInGroupRemovable);
                await expectAsync(fixture.nativeElement).toBeAccessible();
            });

            it('should set role to group of the tag group', () => {
                createTestComponent(TagInGroup);
                expect(fixture.nativeElement.querySelector('nx-tag-group').getAttribute('role')).toBe('group');
            });

            it('should set role of tags to group if removable', () => {
                createTestComponent(TagInGroupRemovable);
                expect(fixture.nativeElement.querySelectorAll('nx-tag')[0].getAttribute('role')).toBe('group');
            });

            it('should not have role if selectable group', () => {
                createTestComponent(TagInGroup);
                expect(fixture.nativeElement.querySelectorAll('nx-tag')[0].getAttribute('role')).toBeNull();
            });
        });
    });
});

@Component({ template: `<nx-tag value="foo"></nx-tag>`, imports: [NxTaglistModule] })
class BasicTag extends TagTest {}

@Injectable()
class MyIntl extends NxTagIntl {
    deleteAriaLabel = 'Custom delete aria-label';
}

@Component({ template: `<nx-tag value="foo" removable="true"></nx-tag>`, imports: [NxTaglistModule], providers: [{ provide: NxTagIntl, useClass: MyIntl }] })
class IntlTag extends TagTest {}

@Component({ template: `<nx-tag value="bar" removable="true" [deleteAriaLabel]="deleteAriaLabel()"></nx-tag>`, imports: [NxTaglistModule] })
class RemovableTag extends TagTest {
    deleteAriaLabel = signal('');
}

@Component({
    template: `
        <nx-tag-group [value]="value()">
            @for (tag of tags(); track tag) {
                <nx-tag [value]="tag"></nx-tag>
            }
        </nx-tag-group>
    `,
    imports: [NxTaglistModule],
})
class TagInGroup extends TagTest {}

@Component({
    template: `
        <nx-tag-group [value]="value()">
            @for (tag of tags(); track tag) {
                <nx-tag [value]="tag">{{ tag }} 123</nx-tag>
            }
        </nx-tag-group>
    `,
    imports: [NxTaglistModule],
})
class TagInGroupContentProjection extends TagTest {}

@Component({
    template: `
        <nx-tag-group [value]="value()" [disabled]="true">
            @for (tag of tags(); track tag) {
                <nx-tag [value]="tag"></nx-tag>
            }
        </nx-tag-group>
    `,
    imports: [NxTaglistModule],
})
class TagInGroupDisabled extends TagTest {}

@Component({
    template: `
        <nx-tag-group [value]="value()" [readonly]="true">
            @for (tag of tags(); track tag) {
                <nx-tag [value]="tag"></nx-tag>
            }
        </nx-tag-group>
    `,
    imports: [NxTaglistModule],
})
class TagInGroupReadonly extends TagTest {}

@Component({
    template: `
        <nx-tag-group [removable]="true">
            @for (tag of tags(); track tag) {
                <nx-tag [value]="tag"></nx-tag>
            }
        </nx-tag-group>
    `,
    imports: [NxTaglistModule],
})
class TagInGroupRemovable extends TagTest {}

@Component({
    template: `
        <nx-tag-group [removable]="true">
            @for (tag of tags(); track tag) {
                <nx-tag>{{ tag }} 123</nx-tag>
            }
        </nx-tag-group>
    `,
    imports: [NxTaglistModule],
})
class TagInGroupRemovableContentProjection extends TagTest {}

@Component({
    template: `
        <nx-tag-group [(ngModel)]="value">
            @for (tag of tags(); track tag) {
                <nx-tag [value]="tag"></nx-tag>
            }
        </nx-tag-group>
    `,
    imports: [NxTaglistModule, FormsModule],
})
class TagInGroupWithNgModel extends TagTest {}

@Component({
    template: `
        <nx-tag-group [formControl]="control">
            @for (tag of tags(); track tag) {
                <nx-tag [value]="tag"></nx-tag>
            }
        </nx-tag-group>
    `,
    imports: [NxTaglistModule, ReactiveFormsModule],
})
class TagInGroupWithFormControl extends TagTest {
    control = new FormControl(this.value());
}
