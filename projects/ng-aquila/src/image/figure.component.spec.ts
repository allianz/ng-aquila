import { Component, Directive, Type, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NxFigureComponent } from './figure.component';
import { NxImageModule } from './image.module';

@Directive()
abstract class ImageTest {
    @ViewChild(NxFigureComponent) imageInstance!: NxFigureComponent;
    keyword!: string;
}

describe('NxImageDirective', () => {
    let fixture: ComponentFixture<ImageTest>;
    let testInstance: ImageTest;
    let imageInstance: NxFigureComponent;
    let imgNativeElement: HTMLImageElement;
    let figureNativeElement: HTMLElement;

    const createTestComponent = (component: Type<ImageTest>) => {
        fixture = TestBed.createComponent(component);
        fixture.detectChanges();
        testInstance = fixture.componentInstance;
        imageInstance = testInstance.imageInstance;
        imgNativeElement = fixture.nativeElement.querySelector('img') as HTMLImageElement;
        figureNativeElement = fixture.nativeElement.querySelector('figure');
    };

    const setKeyword = (keyword: string) => {
        testInstance.keyword = keyword;
        fixture.detectChanges();
    };

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [BasicImage, FigureWithModifier],
            imports: [NxImageModule],
        }).compileComponents();
    }));

    it('creates the Image', waitForAsync(() => {
        createTestComponent(BasicImage);
        expect(imageInstance).toBeTruthy();
    }));

    it('includes the nx-image--auto class by default', waitForAsync(() => {
        createTestComponent(BasicImage);
        expect(figureNativeElement).toHaveClass('nx-image--auto');
    }));

    it('creates full modifier class from a correct keyword', waitForAsync(() => {
        createTestComponent(FigureWithModifier);
        setKeyword('1by1');
        expect(figureNativeElement).toHaveClass('nx-image--1by1');
        setKeyword('1by1dot1');
        expect(figureNativeElement).toHaveClass('nx-image--1by1dot1');
        setKeyword('1dot8by1');
        expect(figureNativeElement).toHaveClass('nx-image--1dot8by1');
        setKeyword('1dot2by1');
        expect(figureNativeElement).toHaveClass('nx-image--1dot2by1');
        setKeyword('2dot6by1');
        expect(figureNativeElement).toHaveClass('nx-image--2dot6by1');
        setKeyword('rounded');
        expect(figureNativeElement).toHaveClass('nx-image--rounded');
    }));

    describe('a11y', () => {
        it('has no accessibility violations', async () => {
            createTestComponent(BasicImage);
            await expectAsync(fixture.nativeElement).toBeAccessible();
        });
    });
});

@Component({
    template: `
        <figure nxFigure>
            <img alt="foo" />
        </figure>
    `,
})
class BasicImage extends ImageTest {}

@Component({
    template: `
        <figure [nxFigure]="keyword">
            <img alt="foo" />
        </figure>
    `,
})
class FigureWithModifier extends ImageTest {}
