import { Component, DebugElement, Directive, ElementRef, Type, ViewChild } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { NxProgressbarComponent } from './progressbar.component';
import { NxProgressbarModule } from './progressbar.module';

@Directive({ standalone: true })
abstract class ProgressBarTest {
    @ViewChild(NxProgressbarComponent) componentInstance!: NxProgressbarComponent;
    @ViewChild(NxProgressbarComponent, { read: ElementRef }) componentInstanceRef!: ElementRef;
}

describe('NxProgressbarComponent', () => {
    let fixture: ComponentFixture<ProgressBarTest>;
    let testInstance: ProgressBarTest;
    let componentInstance: NxProgressbarComponent;
    let componentInstanceRef: ElementRef;
    let barElement: DebugElement;

    function createTestComponent(component: Type<ProgressBarTest>) {
        fixture = TestBed.createComponent(component);
        fixture.detectChanges();
        testInstance = fixture.componentInstance;
        componentInstance = testInstance.componentInstance;
        componentInstanceRef = testInstance.componentInstanceRef;
        barElement = fixture.debugElement.query(By.css('nx-progressbar'));
    }

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [NxProgressbarModule, FormsModule, ProgressBarBasicComponent, ProgressBarValueComponent],
        }).compileComponents();
    }));

    it('should create the component', fakeAsync(() => {
        createTestComponent(ProgressBarBasicComponent);
        expect(componentInstance).toBeTruthy();
    }));

    it('value should default to 0', fakeAsync(() => {
        createTestComponent(ProgressBarBasicComponent);
        expect(componentInstance.value).toBe(0);

        expect(barElement.nativeElement.getAttribute('aria-valuenow')).toBe('0');
        expect(barElement.nativeElement.getAttribute('aria-valuemin')).toBe('0');
        expect(barElement.nativeElement.getAttribute('aria-valuemax')).toBe('1');
    }));

    it('value should reflect binding', fakeAsync(() => {
        createTestComponent(ProgressBarValueComponent);
        expect(componentInstance.value).toBe(0.5);
        expect(barElement.nativeElement.getAttribute('aria-valuenow')).toBe('0.5');
        expect(barElement.nativeElement.getAttribute('aria-valuemin')).toBe('0');
        expect(barElement.nativeElement.getAttribute('aria-valuemax')).toBe('1');
    }));

    it('value should reflect custom range', fakeAsync(() => {
        createTestComponent(ProgressBarCustomRangeComponent);
        expect(componentInstance.value).toBe(15);
        expect(barElement.nativeElement.getAttribute('aria-valuenow')).toBe('15');
        expect(barElement.nativeElement.getAttribute('aria-valuemin')).toBe('12');
        expect(barElement.nativeElement.getAttribute('aria-valuemax')).toBe('33');
    }));

    it('has no accessibility violations', async () => {
        createTestComponent(ProgressBarBasicComponent);
        await expectAsync(fixture.nativeElement).toBeAccessible();
    });
});

@Component({
    template: `<nx-progressbar></nx-progressbar>`,
    standalone: true,
    imports: [NxProgressbarModule, FormsModule],
})
class ProgressBarBasicComponent extends ProgressBarTest {}

@Component({
    template: `<nx-progressbar value="0.5"></nx-progressbar>`,
    standalone: true,
    imports: [NxProgressbarModule, FormsModule],
})
class ProgressBarValueComponent extends ProgressBarTest {}
@Component({
    template: `<nx-progressbar value="15" min="12" max="33"></nx-progressbar>`,
    standalone: true,
    imports: [NxProgressbarModule, FormsModule],
})
class ProgressBarCustomRangeComponent extends ProgressBarTest {}
