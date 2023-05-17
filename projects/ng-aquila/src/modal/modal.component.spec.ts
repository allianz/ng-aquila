import { ChangeDetectionStrategy, Component, DebugElement, Directive, QueryList, Type, ViewChild, ViewChildren } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { NxModalComponent } from './modal.component';
import { NxModalModule } from './modal.module';

@Directive()
abstract class ModalTest {
    open = false;
    @ViewChildren(NxModalComponent) modalInstances!: QueryList<NxModalComponent>;
    @ViewChild(NxModalComponent) modalInstance!: NxModalComponent;
}

describe('NxModalComponent', () => {
    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [NoopAnimationsModule, NxModalModule.forRoot()],
            declarations: [BasicModal, FixedWidthModal, ManualModal, OnPushTest],
        }).compileComponents();
    }));

    let fixture: ComponentFixture<ModalTest>;
    let testInstance: ModalTest;
    let modalInstance: NxModalComponent;
    let debugElement: DebugElement;
    let buttonNativeElement: HTMLButtonElement;

    const createTestComponent = (component: Type<ModalTest>) => {
        fixture = TestBed.createComponent(component);
        fixture.detectChanges();
        testInstance = fixture.componentInstance;
        modalInstance = testInstance.modalInstance;
        debugElement = fixture.debugElement;
        buttonNativeElement = fixture.nativeElement.querySelector('button') as HTMLButtonElement;
    };

    const openModal = () => {
        buttonNativeElement.click();
        fixture.detectChanges();
    };

    describe('basic modal', () => {
        it('should not add the modal to the DOM if it is closed', waitForAsync(() => {
            createTestComponent(BasicModal);
            const basicModalDebugElement: DebugElement = debugElement.query(By.css('#basicModal'));
            expect(basicModalDebugElement).toBeFalsy();
        }));

        it('should open the modal when the button is clicked', waitForAsync(() => {
            createTestComponent(BasicModal);
            openModal();
            const openedModal = fixture.nativeElement.querySelector('#basicModal');
            expect(openedModal).toBeTruthy();
        }));

        it('allow clicking on content within the modal', waitForAsync(() => {
            createTestComponent(BasicModal);
            openModal();
            const button: HTMLButtonElement = fixture.nativeElement.querySelector('#button');

            let clicked = false;
            button.addEventListener('click', () => {
                clicked = true;
            });

            button.click();

            expect(clicked).toBeTruthy();
        }));

        it('should close the modal on click outside', waitForAsync(() => {
            createTestComponent(BasicModal);
            openModal();
            // a click on the backdrop should close the modal again
            const modalBackdrop = fixture.nativeElement.querySelector('.nx-modal__backdrop');
            modalBackdrop.click();
            fixture.detectChanges();
            const openedModal = fixture.nativeElement.querySelector('#basicModal');
            // Expect modal to be closing again; however, since the respective DOM node will only be removed
            // with a delay due to modal closing animation, we cannot simply "expect(openedModal).toBeFalsy()" here.
            // But if angular added the "ng-animating" class, we know that it did its job and since the animation
            // is triggered on ":leave" (see NxModalComponent) the element is surely about to be removed.
            expect(openedModal).toHaveClass('ng-animating');
        }));

        it('should not close the modal on click inside content', waitForAsync(() => {
            createTestComponent(BasicModal);
            openModal();
            const modalContainer = fixture.nativeElement.querySelector('.nx-modal__container');
            modalContainer.click();
            fixture.detectChanges();
            const openedModal = fixture.nativeElement.querySelector('#basicModal');
            // expect modal to be still open
            expect(openedModal).toBeTruthy();
        }));

        it('should contain the cdkscrollable attribute in the content wrapper', waitForAsync(() => {
            createTestComponent(BasicModal);
            openModal();
            const modalWrapper = fixture.nativeElement.querySelector('.nx-modal__content-wrapper');

            expect(modalWrapper).toBeTruthy();
            expect(modalWrapper.attributes.getNamedItem('cdkscrollable')).toBeTruthy();
        }));
    });

    describe('fixed width', () => {
        it('should test for nxSize="fixed"', waitForAsync(() => {
            createTestComponent(FixedWidthModal);
            testInstance.open = true;
            fixture.detectChanges();
            const modalElement = fixture.nativeElement.querySelector('nx-modal');
            const modalContainer = fixture.nativeElement.querySelector('.nx-modal__container');
            const containerStyles = window.getComputedStyle(modalContainer);
            expect(modalElement).toHaveClass('nx-modal--fixed-width');
            expect(containerStyles.width).toBe('736px');
        }));
    });

    describe('closing', () => {
        beforeEach(fakeAsync(() => {
            createTestComponent(ManualModal);
            testInstance.open = true;

            fixture.detectChanges();
            tick();

            modalInstance = testInstance.modalInstances.first;
            spyOn(modalInstance.closeEvent, 'emit');
        }));

        it('should dispatch a close event when backdrop is clicked', () => {
            const modalBackdrop = fixture.nativeElement.querySelector('.nx-modal__backdrop');
            modalBackdrop.click();
            expect(modalInstance.closeEvent.emit).toHaveBeenCalled();
        });

        it('should dispatch a close event when x close button is clicked', () => {
            const closeButton = fixture.nativeElement.querySelector('.nx-modal__close');
            closeButton.click();
            expect(modalInstance.closeEvent.emit).toHaveBeenCalled();
        });
    });

    describe('onPush', () => {
        it('should render modal content when used inside component with onPush', () => {
            createTestComponent(OnPushTest);
            openModal();
            const buttonInModal = fixture.nativeElement.querySelector('button#button');
            expect(buttonInModal).toBeTruthy();
        });

        it('should update the ariaLabel of the close button with onPush', () => {
            createTestComponent(OnPushTest);
            openModal();
            modalInstance = testInstance.modalInstance;
            let closeButton = fixture.nativeElement.querySelector('.nx-modal__close');
            expect(closeButton.getAttribute('aria-label')).toBe('Close dialog');

            modalInstance.closeButtonLabel = 'New label';
            fixture.detectChanges();
            closeButton = fixture.nativeElement.querySelector('.nx-modal__close');
            expect(closeButton.getAttribute('aria-label')).toBe('New label');
        });
    });

    describe('a11y', () => {
        it('has no accessibility violations', async () => {
            createTestComponent(BasicModal);
            await expectAsync(fixture.nativeElement).toBeAccessible();
        });
    });
});

@Component({
    template: `
        <button #basicModalButton nxButton="primary">Show Modal Basic</button>

        <ng-template #basicModalBody>
            basic modal content
            <button id="button">BUTTON</button>
        </ng-template>

        <nx-modal #basicModal id="basicModal" [modalBody]="basicModalBody" *nxOpenModalOnClick="basicModalButton"> </nx-modal>
    `,
})
class BasicModal extends ModalTest {}

@Component({
    template: `
        <ng-template #basicModalBody>
            basic modal content
            <button id="button">BUTTON</button>
        </ng-template>

        <nx-modal #basicModal id="basicModal" [modalBody]="basicModalBody" *ngIf="open"> </nx-modal>
    `,
})
class ManualModal extends ModalTest {}

@Component({
    template: `
        <ng-template #basicModalBody>
            basic modal content
            <button id="button">BUTTON</button>
        </ng-template>

        <nx-modal #basicModal id="basicModal" [modalBody]="basicModalBody" windowSize="fixed" *ngIf="open"> </nx-modal>
    `,
})
class FixedWidthModal extends ModalTest {}

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <button #basicModalButton nxButton="primary">Show Modal Basic</button>

        <ng-template #basicModalBody>
            basic modal content
            <button id="button">BUTTON</button>
        </ng-template>

        <nx-modal #basicModal id="basicModal" [modalBody]="basicModalBody" *nxOpenModalOnClick="basicModalButton"> </nx-modal>
    `,
})
class OnPushTest extends ModalTest {}
