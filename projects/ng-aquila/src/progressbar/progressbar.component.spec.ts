import { Component, Directive, ElementRef, Type, ViewChild } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { NxProgressbarComponent } from './progressbar.component';
import { NxProgressbarModule } from './progressbar.module';

@Directive()
abstract class ProgressBarTest {
    @ViewChild(NxProgressbarComponent) componentInstance!: NxProgressbarComponent;
    @ViewChild(NxProgressbarComponent, { read: ElementRef }) componentInstanceRef!: ElementRef;
}

describe('NxProgressbarComponent', () => {
    let fixture: ComponentFixture<ProgressBarTest>;
    let testInstance: ProgressBarTest;
    let componentInstance: NxProgressbarComponent;
    let componentInstanceRef: ElementRef;

    function createTestComponent(component: Type<ProgressBarTest>) {
        fixture = TestBed.createComponent(component);
        fixture.detectChanges();
        testInstance = fixture.componentInstance;
        componentInstance = testInstance.componentInstance;
        componentInstanceRef = testInstance.componentInstanceRef;
    }

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [ProgressBarBasicComponent, ProgressBarValueComponent],
            imports: [NxProgressbarModule, FormsModule],
        }).compileComponents();
    }));

    it('should create the component', fakeAsync(() => {
        createTestComponent(ProgressBarBasicComponent);
        expect(componentInstance).toBeTruthy();
    }));

    it('value should default to 0', fakeAsync(() => {
        createTestComponent(ProgressBarBasicComponent);
        expect(componentInstance.value).toBe(0);
    }));

    it('value should reflect binding', fakeAsync(() => {
        createTestComponent(ProgressBarValueComponent);
        expect(componentInstance.value).toBe(0.5);
    }));
});

@Component({
    template: `<nx-progressbar></nx-progressbar>`,
})
class ProgressBarBasicComponent extends ProgressBarTest {}

@Component({
    template: `<nx-progressbar value="0.5"></nx-progressbar>`,
})
class ProgressBarValueComponent extends ProgressBarTest {}
