import { Component, Directive, Type, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import * as axe from 'axe-core';

import { NxSwipebarComponent } from './swipebar.component';
import { NxSwipebarModule } from './swipebar.module';

const screenWidth = document.body.offsetWidth;

@Directive()
abstract class SwipebarTest {
    @ViewChild(NxSwipebarComponent) swipebarInstance!: NxSwipebarComponent;
    overflow = false;
}

describe(NxSwipebarComponent.name, () => {
    let fixture: ComponentFixture<SwipebarTest>;
    let testInstance: SwipebarTest;
    let swipebarInstance: NxSwipebarComponent;
    let swipebarElement: HTMLElement;

    function createTestComponent(component: Type<SwipebarTest>) {
        fixture = TestBed.createComponent(component);
        fixture.detectChanges();
        testInstance = fixture.componentInstance;
        swipebarInstance = testInstance.swipebarInstance;
        swipebarElement = fixture.nativeElement.querySelector('nx-swipebar');
    }

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [BasicSwipebar],
            imports: [NxSwipebarModule],
        }).compileComponents();
    }));

    beforeEach(async () => {
        createTestComponent(BasicSwipebar);
        await nextFrame();
    });

    it('creates the swipebar', () => {
        expect(swipebarInstance).toBeTruthy();
    });

    describe('when there is no overflow', () => {
        it('is hidden', () => {
            expect(swipebarElement.querySelector('div')!.style.display).toBe('none');
        });
    });

    describe('when there is overflow', () => {
        beforeEach(async () => {
            testInstance.overflow = true;
            fixture.detectChanges();
            swipebarInstance._onResize();
            await nextFrame();
        });

        it('is visible', () => {
            expect(swipebarElement.querySelector('div')!.style.display).toBe('block');
        });

        it('has an indicator with correct size', () => {
            const indicator: HTMLElement = swipebarElement.querySelector('.indicator') as HTMLElement;
            expect(indicator.offsetWidth).toBe(Math.round(screenWidth / 2));
        });

        it('has an indicator at the correct position', () => {
            const indicator: HTMLElement = swipebarElement.querySelector('.indicator') as HTMLElement;
            expect(indicator.style.transform).toBe('translateX(0px)');
        });

        it('has an indicator at the correct position after scrolling', async () => {
            const scrollable: HTMLElement = swipebarElement.querySelector('.scrollable') as HTMLElement;
            scrollable.scrollTo(screenWidth / 2, 0);
            scrollable.dispatchEvent(new Event('scroll'));
            await nextFrame();

            const indicator: HTMLElement = swipebarElement.querySelector('.indicator') as HTMLElement;
            expect(indicator.style.transform).toBe(`translateX(${Math.floor(screenWidth / 4)}px)`);
        });
    });

    describe('a11y', () => {
        it('has no accessibility violations', done => {
            createTestComponent(BasicSwipebar);

            axe.run(fixture.nativeElement, {}, (error: Error, results: axe.AxeResults) => {
                const violationMessages = results.violations.map(item => item.description).join('\n');
                if (violationMessages.length) {
                    expect(violationMessages).toBeFalsy();
                }
                done();
            });
        });
    });
});

async function nextFrame() {
    return new Promise(resolve => requestAnimationFrame(resolve));
}

@Component({
    template: `
        <nx-swipebar>
            <div class="content" [class.overflow]="overflow"></div>
        </nx-swipebar>
    `,
    styles: [
        `
            .overflow {
                height: 10px;
                width: ${screenWidth * 2}px;
            }
        `,
    ],
})
class BasicSwipebar extends SwipebarTest {}
