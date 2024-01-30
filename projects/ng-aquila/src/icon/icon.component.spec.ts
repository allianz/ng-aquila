import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Component, Directive, Type, ViewChild } from '@angular/core';
import { ComponentFixture, fakeAsync, inject, TestBed, waitForAsync } from '@angular/core/testing';
import { DomSanitizer, SafeHtml, SafeResourceUrl } from '@angular/platform-browser';

import { NxIconComponent } from './icon.component';
import { NxIconModule } from './icon.module';
import { NxIconRegistry } from './icon-registry';

@Directive()
abstract class IconTest {
    @ViewChild(NxIconComponent) buttonInstance!: NxIconComponent;
    name = '';
    font = 'custom-font';
}

describe('NxIconComponent', () => {
    let fixture: ComponentFixture<IconTest>;
    let testInstance: IconTest;
    let iconInstance: NxIconComponent;
    let iconNativeElement: HTMLElement;

    function createTestComponent(component: Type<IconTest>) {
        fixture = TestBed.createComponent(component);
        fixture.detectChanges();
        testInstance = fixture.componentInstance;
        iconInstance = testInstance.buttonInstance;
        iconNativeElement = fixture.nativeElement.querySelector('nx-icon') as HTMLButtonElement;
    }

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [BasicIcon, SizeIcon, OutlineIcon, FillIcon, DynamicIcon, FontIcon],
            imports: [NxIconModule, HttpClientTestingModule],
        }).compileComponents();
    }));

    it('creates the button', waitForAsync(() => {
        createTestComponent(BasicIcon);
        expect(iconInstance).toBeTruthy();
    }));

    it('adds the name data attribute for an icon', waitForAsync(() => {
        createTestComponent(BasicIcon);
        expect(iconNativeElement.getAttribute('data-nx-icon-name')).toBe('heart');
    }));

    it('adds the class name for a icon', waitForAsync(() => {
        createTestComponent(BasicIcon);
        expect(iconNativeElement).toHaveClass('heart');
    }));

    it('adds the class name for size', waitForAsync(() => {
        createTestComponent(SizeIcon);
        expect(iconNativeElement).toHaveClass('nx-icon--m');
    }));

    it('adds the class name for outline', waitForAsync(() => {
        createTestComponent(OutlineIcon);
        expect(iconNativeElement).toHaveClass('nx-icon--outline');
    }));

    it('adds the class name for fill', waitForAsync(() => {
        createTestComponent(FillIcon);
        expect(iconNativeElement).toHaveClass('nx-icon--fill');
    }));

    it('should change icon on binding changes', () => {
        createTestComponent(DynamicIcon);
        (testInstance as DynamicIcon).name = 'setting';
        fixture.detectChanges();
        expect(iconNativeElement).toHaveClass('setting');
    });

    it('should change size on binding changes', () => {
        createTestComponent(DynamicIcon);
        (testInstance as DynamicIcon).size = 's';
        fixture.detectChanges();
        expect(iconNativeElement).toHaveClass('nx-icon--s');
    });

    describe('a11y', () => {
        it('has no accessibility violations', async () => {
            createTestComponent(BasicIcon);
            await expectAsync(fixture.nativeElement).toBeAccessible();
        });
    });

    describe('Icon registry', () => {
        let iconRegistry: NxIconRegistry;
        let sanitizer: DomSanitizer;
        let http: HttpTestingController;

        /** Marks an SVG icon url as explicitly trusted. */
        function trustUrl(iconUrl: string): SafeResourceUrl {
            return sanitizer.bypassSecurityTrustResourceUrl(iconUrl);
        }

        /** Marks an SVG icon string as explicitly trusted. */
        function trustHtml(iconHtml: string): SafeHtml {
            return sanitizer.bypassSecurityTrustHtml(iconHtml);
        }

        /**
         * Verifies that an element contains a single `<svg>` child element, and returns that child.
         */
        function verifyAndGetSingleSvgChild(element: HTMLElement): SVGElement {
            expect(element.id).toBeFalsy();
            expect(element.childNodes).toHaveSize(1);
            const svgChild = element.childNodes[0] as SVGElement;
            expect(svgChild.tagName.toLowerCase()).toBe('svg');
            return svgChild;
        }

        beforeEach(inject([NxIconRegistry, HttpTestingController, DomSanitizer], (nir: NxIconRegistry, htc: HttpTestingController, ds: DomSanitizer) => {
            iconRegistry = nir;
            http = htc;
            sanitizer = ds;
        }));

        describe('Svg Icons', () => {
            it('should register icon URL', fakeAsync(() => {
                iconRegistry.addSvgIcon('custom-icon-name', trustUrl('custom-svg-icon.svg'));
                createTestComponent(DynamicIcon);
                testInstance.name = 'custom-icon-name';
                fixture.detectChanges();
                http.expectOne('custom-svg-icon.svg').flush(FAKE_SVG_ICON);
                expect(iconNativeElement).not.toHaveClass('nx-icon--custom-icon-name');
                verifyAndGetSingleSvgChild(iconNativeElement);
            }));

            it('should clone svg element', () => {
                iconRegistry.addSvgIconLiteral('heart', trustHtml(getFakeSvgWithClass('my-heart')));
                const iconFixture1 = TestBed.createComponent(BasicIcon);
                iconFixture1.detectChanges();
                const iconFixture2 = TestBed.createComponent(BasicIcon);
                iconFixture2.detectChanges();
                const svg1 = iconFixture1.nativeElement.querySelector('svg');
                const svg2 = iconFixture2.nativeElement.querySelector('svg');
                expect(svg1).toBeTruthy();
                expect(svg2).toBeTruthy();
                expect(svg1).not.toBe(svg2);
            });

            it('should throw an error when using an untrusted icon url', fakeAsync(() => {
                expect(() => {
                    iconRegistry.addSvgIcon('custom-icon-name', 'custom-svg-icon.svg');
                }).toThrowError(/unsafe value used in a resource URL context/);
            }));

            it('should register icon HTML string', fakeAsync(() => {
                createTestComponent(DynamicIcon);
                iconRegistry.addSvgIconLiteral('custom-icon-name', trustHtml('<svg><path class="my-svg" id="fake-icon" name="fake-icon"></path></svg>'));
                testInstance.name = 'custom-icon-name';
                fixture.detectChanges();
                expect(iconNativeElement).not.toHaveClass('nx-icon--custom-icon-name');
                const svg = verifyAndGetSingleSvgChild(iconNativeElement);
                expect(svg.querySelector('.my-svg')).toBeTruthy();
            }));

            it('should throw an error when using untrusted HTML', () => {
                expect(() => {
                    iconRegistry.addSvgIconLiteral('custom-icon-name', '<svg><path id="fake-icon" name="fake-icon"></path></svg>');
                }).toThrowError(/was not trusted as safe HTML/);
            });

            it('should override essential icon with svg', () => {
                iconRegistry.addSvgIconLiteral('chevron-down', trustHtml(getFakeSvgWithClass('my-chevron-down'))); // TODO
                createTestComponent(DynamicIcon);
                testInstance.name = 'chevron-down';
                fixture.detectChanges();
                const svg = verifyAndGetSingleSvgChild(iconNativeElement);
                expect(svg.querySelector('.my-chevron-down')).toBeTruthy();
            });

            it('should cache svgs', () => {
                iconRegistry.addSvgIcon('my-svg', trustUrl('/$my-svg'));
                createTestComponent(DynamicIcon);
                testInstance.name = 'my-svg';
                fixture.detectChanges();
                http.expectOne('/$my-svg').flush(getFakeSvgWithClass('my-svg'));

                testInstance.name = 'other';
                fixture.detectChanges();

                testInstance.name = 'my-svg';
                fixture.detectChanges();
                http.expectNone('/$my-svg');
                const svg = verifyAndGetSingleSvgChild(iconNativeElement);
                expect(svg.querySelector('.my-svg')).toBeTruthy();
            });
        });

        describe('Icon fonts', () => {
            it('should use default icon font if input is not set', () => {
                createTestComponent(DynamicIcon);
                iconRegistry.registerFont('custom-font', 'custom-font', 'custom-font--');
                iconRegistry.setDefaultFont('custom-font');
                testInstance.name = 'custom-icon-name';
                fixture.detectChanges();
                expect(iconNativeElement).toHaveClass('custom-font--custom-icon-name');
            });

            it('should add font host class', () => {
                iconRegistry.registerFont('custom-font', 'custom-font');
                iconRegistry.setDefaultFont('custom-font');
                createTestComponent(DynamicIcon);
                expect(iconNativeElement).toHaveClass('custom-font');
            });

            it('should add font prefix', () => {
                iconRegistry.registerFont('custom-font', 'custom-font', 'custom-prefix--');
                iconRegistry.setDefaultFont('custom-font');
                createTestComponent(DynamicIcon);
                expect(iconNativeElement).toHaveClass('custom-prefix--heart');
            });

            it('should use font input if present', () => {
                iconRegistry.registerFont('custom-font', 'custom-font', 'custom-prefix--');
                createTestComponent(FontIcon);
                expect(iconNativeElement).toHaveClass('custom-font');
            });

            it('should throw if font is unkown', () => {
                expect(() => {
                    createTestComponent(FontIcon);
                    testInstance.font = 'not-existing';
                }).toThrowError(/Cannot find registered font with name/);
            });

            it('should throw when unknown font is set as default', () => {
                expect(() => {
                    iconRegistry.setDefaultFont('not-existing');
                }).toThrowError(/Cannot find registered font with name/);
            });

            it('should override essential icon with font', () => {
                iconRegistry.registerFont('my-font', 'my-font');
                iconRegistry.addFontIcon('chevron-down', '', 'my-font');
                createTestComponent(DynamicIcon);
                testInstance.name = 'chevron-down';
                fixture.detectChanges();
                expect(iconNativeElement).toHaveClass('my-font');
                expect(iconNativeElement).toHaveClass('chevron-down');
            });

            it('should override essential icon with font alias', () => {
                iconRegistry.registerFont('my-font', 'my-font');
                iconRegistry.addFontIcon('chevron-down', 'arrow-up', 'my-font');
                createTestComponent(DynamicIcon);
                testInstance.name = 'chevron-down';
                fixture.detectChanges();
                expect(iconNativeElement).toHaveClass('my-font');
                expect(iconNativeElement).not.toHaveClass('chevron-down');
                expect(iconNativeElement).toHaveClass('arrow-up');
            });
        });
    });
});

@Component({
    template: `<nx-icon name="heart"></nx-icon>`,
})
class BasicIcon extends IconTest {}

@Component({
    template: `<nx-icon name="heart" size="m"></nx-icon>`,
})
class SizeIcon extends IconTest {}

@Component({
    template: `<nx-icon name="heart" outline="true"></nx-icon>`,
})
class OutlineIcon extends IconTest {}

@Component({
    template: `<nx-icon name="heart" fill="true"></nx-icon>`,
})
class FillIcon extends IconTest {}

@Component({
    template: `<nx-icon [name]="name" [size]="size" fill="true"></nx-icon>`,
})
class DynamicIcon extends IconTest {
    name = 'heart';
    size = 'm';
}

@Component({
    template: `<nx-icon [name]="name" [font]="font"></nx-icon>`,
})
class FontIcon extends IconTest {
    font = 'custom-font';
}

export const FAKE_SVG_ICON = '<svg><path id="fake-icon" name="fake-icon"></path></svg>';
export function getFakeSvgWithClass(klass: string) {
    return `<svg><path class="${klass}" id="fake-icon" name="fake-icon"></path></svg>`;
}
