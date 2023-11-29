import { Component, ElementRef, Renderer2 } from '@angular/core';
import { TestBed, waitForAsync } from '@angular/core/testing';

import { appendClasses, clamp, mapClassNames, numberOfDecimals, removeClasses } from './utils';

describe('shared utils', () => {
    describe('mapClassNames', () => {
        it('should return nothing when empty', () => {
            const classes = mapClassNames('', [], {});
            expect(classes).toBe('');
        });

        it('should include defaults', () => {
            const classes = mapClassNames('', ['defaults-class'], {});
            expect(classes).toBe('defaults-class');
        });

        it('should include a mapped class', () => {
            const MAPPING = {
                'given-key': 'return-this-value',
            };

            const classes = mapClassNames('given-key', [], MAPPING);
            expect(classes).toBe('return-this-value');
        });

        it('should include a mapped class and defaults', () => {
            const MAPPING = {
                'given-key': 'return-this-value',
            };

            const classes = mapClassNames('given-key', ['defaults-class'], MAPPING);
            expect(classes).toBe('defaults-class return-this-value');
        });

        it('should ignore not requested mappings', () => {
            const MAPPING = {
                'given-key': 'return-this-value',
                'ignored-key': 'do-not-return-this-value',
            };

            const classes = mapClassNames('given-key', [], MAPPING);
            expect(classes).toBe('return-this-value');
        });
    });

    describe('numberOfDecimals', () => {
        it('should return 0 for integer and NaN', () => {
            expect(numberOfDecimals(1)).toBe(0);
            expect(numberOfDecimals('aa')).toBe(0);
        });

        it('should return the correct number of decimals', () => {
            expect(numberOfDecimals(1.1)).toBe(1);
            expect(numberOfDecimals(1.03)).toBe(2);
            expect(numberOfDecimals(1.1111)).toBe(4);
            expect(numberOfDecimals(1.12345678)).toBe(8);
        });
    });

    describe('appendClasses/removeClasses', () => {
        beforeEach(waitForAsync(() => {
            TestBed.configureTestingModule({
                declarations: [TestComponent],
                imports: [],
            }).compileComponents();
        }));

        it('should append classes', () => {
            const fixture = TestBed.createComponent(TestComponent);
            fixture.detectChanges();
            const testInstance = fixture.componentInstance;
            testInstance.testAppendClasses('newClass1 newClass2');
            expect(fixture.debugElement.nativeElement).toHaveClass('newClass1');
            expect(fixture.debugElement.nativeElement).toHaveClass('newClass2');
            expect(fixture.debugElement.nativeElement).toHaveClass('testClass');
        });

        it('should remove classes', () => {
            const fixture = TestBed.createComponent(TestComponent);
            fixture.detectChanges();
            const testInstance = fixture.componentInstance;
            testInstance.testRemoveClasses('testClass');
            expect(fixture.debugElement.nativeElement).not.toHaveClass('testClass');
        });
    });

    describe('clamp', () => {
        it('should be 1 for maximum by default', () => {
            expect(clamp(2)).toBe(1);
        });

        it('should be 0 for minimum by default', () => {
            expect(clamp(-1)).toBe(0);
        });

        it('should support custom minimum', () => {
            expect(clamp(0, 0.5)).toBe(0.5);
        });

        it('should support custom maximum', () => {
            expect(clamp(5, 0, 2)).toBe(2);
        });
    });
});

@Component({
    template: '',
    host: {
        '[class.testClass]': 'true',
    },
})
class TestComponent {
    constructor(
        private readonly _elementRef: ElementRef,
        private readonly _renderer: Renderer2,
    ) {}

    testAppendClasses(classes: any) {
        appendClasses(this._renderer, this._elementRef, classes);
    }

    testRemoveClasses(classes: any) {
        removeClasses(this._renderer, this._elementRef, classes);
    }
}
