import { BACKSPACE, DELETE } from '@angular/cdk/keycodes';
import { Component, Directive, Type, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { dispatchKeyboardEvent } from '../cdk-test-utils';
import { NxTagComponent } from './tag.component';
import { NxTaglistModule } from './taglist.module';

@Directive()
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
            declarations: [BasicTag, RemovableTag],
            imports: [NxTaglistModule],
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

    it('should emit event when tag is clicked', () => {
        createTestComponent(BasicTag);
        spyOn(tagInstance.clicked, 'emit');
        fixture.debugElement.nativeElement.querySelector('nx-tag').click();
        fixture.detectChanges();
        expect(tagInstance.clicked.emit).toHaveBeenCalledWith('foo');
    });

    it('should emit event when close icon is clicked', () => {
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
        dispatchKeyboardEvent(tagEl, 'keydown', DELETE);
        fixture.detectChanges();
        expect(tagInstance.removed.emit).not.toHaveBeenCalledWith('foo');

        dispatchKeyboardEvent(tagEl, 'keydown', BACKSPACE);
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
        it('should emit (removed) event when BACKSPACE is pressed', () => {
            createTestComponent(RemovableTag);
            spyOn(tagInstance.removed, 'emit');
            const tagEl = fixture.nativeElement.querySelector('nx-tag');
            dispatchKeyboardEvent(tagEl, 'keydown', BACKSPACE);
            fixture.detectChanges();
            expect(tagInstance.removed.emit).toHaveBeenCalledWith('bar');
        });

        it('should emit (removed) event when DELETE is pressed', () => {
            createTestComponent(RemovableTag);
            spyOn(tagInstance.removed, 'emit');
            const tagEl = fixture.nativeElement.querySelector('nx-tag');
            dispatchKeyboardEvent(tagEl, 'keydown', DELETE);
            fixture.detectChanges();
            expect(tagInstance.removed.emit).toHaveBeenCalledWith('bar');
        });

        it('has no accessibility violations', async () => {
            createTestComponent(BasicTag);
            await expectAsync(fixture.nativeElement).toBeAccessible();
        });
    });
});

@Component({
    template: `<nx-tag value="foo"></nx-tag>`,
})
class BasicTag extends TagTest {}

@Component({
    template: `<nx-tag value="bar" removable="true"></nx-tag>`,
})
class RemovableTag extends TagTest {}
