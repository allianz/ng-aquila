import { LEFT_ARROW, RIGHT_ARROW, SPACE } from '@angular/cdk/keycodes';
import { ChangeDetectionStrategy, Component, DebugElement, Directive, Type, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MAX_WIDTH, MIN_WIDTH, NxSidebarComponent, RESIZE_STEP_SIZE } from './sidebar.component';
import { NxSidebarModule } from './sidebar.module';

@Directive()
abstract class SidebarTest {
    @ViewChild(NxSidebarComponent) sidebarInstance!: NxSidebarComponent;
}

describe('NxSidebarComponent', () => {
    let fixture: ComponentFixture<SidebarTest>;
    let testInstance: SidebarTest;
    let sidebarInstance: NxSidebarComponent;
    let sidebarElement: DebugElement;
    let sidebarHandleElement: DebugElement;
    const DEFAULT_WIDTH = 280;

    function mouseDrag(element: DebugElement, current: number, target: number) {
        try {
            element.triggerEventHandler('mousedown', {
                type: 'mousedown',
                screenX: current,
            });

            const doc = element.nativeElement.ownerDocument;

            const mousemove = new Event('mousemove') as any;
            mousemove.screenX = target;
            doc.dispatchEvent(mousemove);

            const mouseup = new Event('mouseup') as any;
            mouseup.screenX = target;
            doc.dispatchEvent(mouseup);
        } catch (e) {
            console.error(e);
        }
    }

    function clickToggleButton() {
        sidebarElement.query(By.css('.nx-sidebar__toggle-button')).triggerEventHandler('click', false);
    }

    function createTestComponent(component: Type<SidebarTest>) {
        fixture = TestBed.createComponent(component);
        fixture.detectChanges();
        testInstance = fixture.componentInstance;
        sidebarInstance = testInstance.sidebarInstance;
        sidebarElement = fixture.debugElement.query(By.css('nx-sidebar'));
        sidebarHandleElement = sidebarElement.query(By.css('.nx-sidebar__handle'));
    }

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [BasicSidebar, ResizeableSidebar, WideSidebar],
            imports: [BrowserAnimationsModule, NxSidebarModule],
        }).compileComponents();
    }));

    describe('basic', () => {
        beforeEach(() => {
            createTestComponent(BasicSidebar);
        });

        it('creates the sidebar', waitForAsync(() => {
            expect(sidebarInstance).toBeTruthy();
        }));

        it('displays the content', waitForAsync(() => {
            const content = sidebarElement.nativeElement.querySelector('.nx-sidebar__content').textContent;
            expect(content).toBe('Hello sidebar');
        }));

        it('has default width by default', () => {
            expect(sidebarElement.nativeElement.style.width).toBe(`${DEFAULT_WIDTH}px`);
        });

        it('is open by default', () => {
            expect(sidebarInstance.open).toBeTrue();
        });

        it('should not render the resize handle', () => {
            expect(sidebarElement.nativeElement.querySelector('.nx-sidebar__handle')).toBeNull();
        });

        it('expands to a certain width when expand() is called with a parameter', () => {
            sidebarInstance.expand(350);
            fixture.detectChanges();
            expect(sidebarElement.nativeElement.style.width).toBe('350px');
        });
    });

    describe('resizeable', () => {
        beforeEach(() => {
            createTestComponent(ResizeableSidebar);
        });

        it('has the resize handle', () => {
            const resizeHandle = sidebarElement.query(By.css('.nx-sidebar__handle'));
            expect(resizeHandle).not.toBeNull();
        });

        it('has the resize handle aria-label', () => {
            const resizeHandle = sidebarElement.query(By.css('.nx-sidebar__handle'));
            expect(resizeHandle.attributes['aria-label']).toBe('example label');
        });

        describe('when clicking resize handle in open state', () => {
            beforeEach(() => {
                spyOn(sidebarInstance.widthChange, 'emit');
                sidebarHandleElement.triggerEventHandler('click', false);
                fixture.detectChanges();
            });

            it('is closed', () => {
                expect(sidebarElement.nativeElement.style.width).toBe(`${MIN_WIDTH}px`);
            });

            it('it emits the new width (min width)', () => {
                expect(sidebarInstance.widthChange.emit).toHaveBeenCalledWith(MIN_WIDTH);
            });
        });

        describe('when clicking resize handle in closed state', () => {
            beforeEach(() => {
                sidebarInstance.close();
                spyOn(sidebarInstance.widthChange, 'emit');
                sidebarHandleElement.triggerEventHandler('click', false);
                fixture.detectChanges();
            });

            it('is open at default width', () => {
                expect(sidebarElement.nativeElement.style.width).toBe(`${DEFAULT_WIDTH}px`);
            });

            it('it emits the new width (default width)', () => {
                expect(sidebarInstance.widthChange.emit).toHaveBeenCalledWith(DEFAULT_WIDTH);
            });
        });

        describe('when dragging handle from open state to closed state', () => {
            beforeEach(() => {
                mouseDrag(sidebarHandleElement, MAX_WIDTH, 0);
                fixture.detectChanges();
            });

            it('is closed', () => {
                expect(sidebarElement.nativeElement.style.width).toBe(`${MIN_WIDTH}px`);
            });
        });

        describe('when dragging handle from closed state to open state', () => {
            beforeEach(() => {
                sidebarInstance.close();
                fixture.detectChanges();
                spyOn(sidebarInstance.widthChange, 'emit');
                mouseDrag(sidebarHandleElement, 0, sidebarInstance.maxWidth + 100);
                fixture.detectChanges();
            });

            it('is open', () => {
                expect(sidebarElement.nativeElement.style.width).toBe(`${sidebarInstance.maxWidth}px`);
            });

            it('it emits the new width (max width)', () => {
                expect(sidebarInstance.widthChange.emit).toHaveBeenCalledWith(sidebarInstance.maxWidth);
            });
        });

        describe('when dragging handle', () => {
            it('markForCheck is called twice', () => {
                // eslint-disable-next-line @typescript-eslint/dot-notation
                const markForCheckSpy = spyOn(sidebarInstance['_cdr'], 'markForCheck'); // workaround: accessing private class member
                mouseDrag(sidebarHandleElement, 0, 100);
                // HINT: called once on resize, and once when setting new width.
                expect(markForCheckSpy).toHaveBeenCalledTimes(2);
            });
        });

        describe('when using keyboard', () => {
            describe('and pressing SPACE', () => {
                beforeEach(() => {
                    sidebarHandleElement.triggerEventHandler('keydown', {
                        preventDefault: () => {},
                        which: SPACE,
                    });
                    fixture.detectChanges();
                });

                it('is a button element to ensure a11y', () => {
                    expect(sidebarHandleElement.nativeElement.tagName).toBe('BUTTON');
                });

                it('is closed', () => {
                    expect(sidebarInstance.open).toBeFalse();
                });
            });

            describe('and pressing LEFT_ARROW', () => {
                beforeEach(() => {
                    sidebarHandleElement.nativeElement.focus();
                    sidebarHandleElement.triggerEventHandler('keydown', {
                        which: LEFT_ARROW,
                        preventDefault: () => {},
                    });
                    fixture.detectChanges();
                });

                it('is open', () => {
                    expect(sidebarInstance.open).toBeTrue();
                });

                it('is has reduced width', () => {
                    expect(sidebarElement.nativeElement.style.width).toBe(`${DEFAULT_WIDTH - RESIZE_STEP_SIZE}px`);
                });
            });

            describe('and pressing RIGHT_ARROW when closed', () => {
                beforeEach(() => {
                    sidebarInstance.close();
                    sidebarHandleElement.nativeElement.focus();
                    sidebarHandleElement.triggerEventHandler('keydown', {
                        which: RIGHT_ARROW,
                        preventDefault: () => {},
                    });
                    fixture.detectChanges();
                });

                it('is open', () => {
                    expect(sidebarInstance.open).toBeTrue();
                });

                it('is restores the previous width', () => {
                    expect(sidebarElement.nativeElement.style.width).toBe(`${DEFAULT_WIDTH}px`);
                });
            });
        });
    });

    describe('setting min width', () => {
        beforeEach(() => {
            createTestComponent(WideSidebar);
            clickToggleButton();
            fixture.detectChanges();
        });

        it('has the minimal width', () => {
            expect(sidebarElement.nativeElement.style.width).toBe('140px');
        });
    });

    describe('programmatic change', () => {
        beforeEach(() => {
            createTestComponent(BasicSidebar);
        });

        describe('when closed', () => {
            beforeEach(() => {
                sidebarInstance.close();
                fixture.detectChanges();
            });

            it('is not open', () => {
                expect(sidebarInstance.open).toBeFalse();
            });

            it('has the minimal width', () => {
                expect(sidebarElement.nativeElement.style.width).toBe(`${MIN_WIDTH}px`);
            });
        });

        describe('when opened', () => {
            beforeEach(() => {
                sidebarInstance.close();
                sidebarInstance.expand();
                fixture.detectChanges();
            });

            it('is open', () => {
                expect(sidebarInstance.open).toBeTrue();
            });

            it('has the the default width', () => {
                expect(sidebarElement.nativeElement.style.width).toBe(`${DEFAULT_WIDTH}px`);
            });
        });

        describe('when toggling', () => {
            beforeEach(() => {
                sidebarInstance.toggle();
                fixture.detectChanges();
            });

            it('is not open', () => {
                expect(sidebarInstance.open).toBeFalse();
            });

            it('has the minimal width', () => {
                expect(sidebarElement.nativeElement.style.width).toBe(`${MIN_WIDTH}px`);
            });

            describe('and toggling again', () => {
                beforeEach(() => {
                    sidebarInstance.toggle();
                    fixture.detectChanges();
                });

                it('is open', () => {
                    expect(sidebarInstance.open).toBeTrue();
                });

                it('has the default width', () => {
                    expect(sidebarElement.nativeElement.style.width).toBe(`${DEFAULT_WIDTH}px`);
                });
            });
        });

        describe('when setting width', () => {
            beforeEach(() => {
                sidebarInstance.width = 200;
                fixture.detectChanges();
            });

            it('has the changed width', () => {
                expect(sidebarElement.nativeElement.style.width).toBe('200px');
            });
        });

        describe('when setting min width', () => {
            beforeEach(() => {
                createTestComponent(WideSidebar);
                sidebarInstance.minWidth = 140;
                sidebarInstance.toggle();
                fixture.detectChanges();
            });

            it('has the minimal width', () => {
                expect(sidebarElement.nativeElement.style.width).toBe('140px');
            });
        });

        describe('when setting max width', () => {
            beforeEach(() => {
                createTestComponent(WideSidebar);
                sidebarInstance.maxWidth = 500;
                sidebarInstance.toggle();
                mouseDrag(sidebarHandleElement, 0, sidebarInstance.maxWidth);
                fixture.detectChanges();
            });

            it('sets the max width', () => {
                expect(sidebarElement.nativeElement.style.width).toBe('500px');
            });
        });

        describe('when activating resizing', () => {
            beforeEach(() => {
                sidebarInstance.resizeable = true;
                fixture.detectChanges();
            });

            it('has the resize handle', () => {
                const resizeHandle = sidebarElement.query(By.css('.nx-sidebar__handle'));
                expect(resizeHandle).not.toBeNull();
            });

            describe('when deactivating resizing', () => {
                beforeEach(() => {
                    sidebarInstance.resizeable = false;
                    fixture.detectChanges();
                });

                it('has no resize handle', () => {
                    const resizeHandle = sidebarElement.query(By.css('.nx-sidebar__handle'));
                    expect(resizeHandle).toBeNull();
                });
            });
        });

        describe('when setting the handle aria-label', () => {
            beforeEach(() => {
                sidebarInstance.resizeable = true;
                fixture.detectChanges();
                sidebarInstance.resizeHandleAriaLabel = 'changed label';
                fixture.detectChanges();
            });

            it('has the aria-label', () => {
                const resizeHandle = sidebarElement.query(By.css('.nx-sidebar__handle'));
                expect(resizeHandle.attributes['aria-label']).toBe('changed label');
            });
        });
    });

    describe('a11y', () => {
        it('has no accessibility violations', async () => {
            createTestComponent(ResizeableSidebar);
            await expectAsync(fixture.nativeElement).toBeAccessible();
        });
    });
});

@Component({
    template: `<nx-sidebar>Hello sidebar</nx-sidebar>`,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
class BasicSidebar extends SidebarTest {}

@Component({
    template: `<nx-sidebar resizeable resizeHandleAriaLabel="example label">Hello sidebar</nx-sidebar>`,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
class ResizeableSidebar extends SidebarTest {}

@Component({
    template: `
        <nx-sidebar minWidth="140" resizeable
            >Hello sidebar
            <nx-sidebar-footer>
                <button nxSidebarToggle>Toggle</button>
            </nx-sidebar-footer>
        </nx-sidebar>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
class WideSidebar extends SidebarTest {}
