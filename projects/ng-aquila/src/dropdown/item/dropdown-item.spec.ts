import { Component, Directive, Type, ViewChild } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, waitForAsync } from '@angular/core/testing';

import { NxDropdownModule } from '../dropdown.module';
import { NxDropdownItemComponent } from './dropdown-item';

@Directive()
abstract class DropdownItemTest {
    @ViewChild(NxDropdownItemComponent) item: any;
}

describe('NxDropdownItem component', () => {
    let fixture: ComponentFixture<DropdownItemTest>;
    let testInstance: DropdownItemTest;
    let itemInstance: NxDropdownItemComponent;

    function createTestComponent(component: Type<DropdownItemTest>) {
        fixture = TestBed.createComponent(component);
        fixture.detectChanges();
        testInstance = fixture.componentInstance;
        itemInstance = testInstance.item;
    }

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [NxDropdownModule],
            declarations: [BasicItem, EmptyItem, ProjectedItem],
        }).compileComponents();
    }));

    it('should complete the `stateChanges` stream on destroy', () => {
        createTestComponent(BasicItem);
        fixture.detectChanges();

        const completeSpy = jasmine.createSpy('complete spy');
        const subscription = itemInstance._stateChanges.subscribe({ complete: completeSpy });

        fixture.destroy();
        expect(completeSpy).toHaveBeenCalled();
        subscription.unsubscribe();
    });

    it('should not emit to `onSelectionChange` if selecting an already-selected option', () => {
        createTestComponent(BasicItem);
        fixture.detectChanges();

        itemInstance.select();
        expect(itemInstance.selected).toBeTrue();

        const spy = jasmine.createSpy('selection change spy');
        const subscription = itemInstance.onSelectionChange.subscribe(spy);

        itemInstance.select();
        fixture.detectChanges();

        expect(itemInstance.selected).toBeTrue();
        expect(spy).not.toHaveBeenCalled();

        subscription.unsubscribe();
    });

    it('should not emit to `onSelectionChange` if deselecting an unselected option', () => {
        createTestComponent(BasicItem);
        fixture.detectChanges();

        itemInstance.deselect();
        expect(itemInstance.selected).toBeFalse();

        const spy = jasmine.createSpy('selection change spy');
        const subscription = itemInstance.onSelectionChange.subscribe(spy);

        itemInstance.deselect();
        fixture.detectChanges();

        expect(itemInstance.selected).toBeFalse();
        expect(spy).not.toHaveBeenCalled();

        subscription.unsubscribe();
    });

    it('should return empty viewValue when value is empty or null', fakeAsync(() => {
        createTestComponent(EmptyItem);
        expect(fixture.componentInstance.item.viewValue).toBe('');
    }));

    it('should return the item value for viewValue', fakeAsync(() => {
        createTestComponent(BasicItem);
        expect(fixture.componentInstance.item.viewValue).toBe('option');
    }));

    it('should return the text content for viewValue on content projection', fakeAsync(() => {
        createTestComponent(ProjectedItem);
        expect(fixture.componentInstance.item.viewValue).toBe('label');
    }));
});

@Component({
    template: `<nx-dropdown><nx-dropdown-item value="option"></nx-dropdown-item></nx-dropdown>`,
})
class BasicItem extends DropdownItemTest {}

@Component({
    template: `<nx-dropdown><nx-dropdown-item></nx-dropdown-item></nx-dropdown>`,
})
class EmptyItem extends DropdownItemTest {}

@Component({
    template: `<nx-dropdown
        ><nx-dropdown-item value="option"><span>label</span></nx-dropdown-item></nx-dropdown
    >`,
})
class ProjectedItem extends DropdownItemTest {}
