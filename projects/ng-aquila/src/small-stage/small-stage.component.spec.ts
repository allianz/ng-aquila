import { Component, DebugElement, Directive, Type, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { NxSmallStageComponent } from './small-stage.component';
import { NxSmallStageModule } from './small-stage.module';

@Directive()
abstract class SmallStageTest {
    @ViewChild(NxSmallStageComponent) smallStageInstance!: NxSmallStageComponent;
}

describe('NxSmallStageComponent', () => {
    let fixture: ComponentFixture<SmallStageTest>;
    let testInstance: SmallStageTest;
    let smallStageInstance: NxSmallStageComponent;
    let smallStageDebugElement: DebugElement;

    const createTestComponent = (component: Type<SmallStageTest>) => {
        fixture = TestBed.createComponent(component);
        fixture.detectChanges();
        testInstance = fixture.componentInstance;
        smallStageInstance = testInstance.smallStageInstance;
        smallStageDebugElement = fixture.debugElement.query(By.directive(NxSmallStageComponent));
    };

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [BasicSmallStage, SmallTextSmallStage, ExpertSmallStage],
            imports: [NxSmallStageModule],
        }).compileComponents();
    }));

    it('creates the small stage', waitForAsync(() => {
        createTestComponent(BasicSmallStage);
        expect(smallStageInstance).toBeTruthy();
    }));

    describe('basic', () => {
        it('renders the start image', () => {
            createTestComponent(BasicSmallStage);
            const image = smallStageDebugElement.nativeElement.querySelector('.image-start nx-small-stage-image');
            expect(image).not.toBeNull();
        });

        it('renders the end image', () => {
            createTestComponent(BasicSmallStage);
            const image = smallStageDebugElement.nativeElement.querySelector('.image-end nx-small-stage-image');
            expect(image).not.toBeNull();
        });

        it('renders the bottom image', () => {
            createTestComponent(BasicSmallStage);
            const image = smallStageDebugElement.nativeElement.querySelector('.image-bottom nx-small-stage-image');
            expect(image).not.toBeNull();
        });

        it('renders the header', () => {
            createTestComponent(BasicSmallStage);
            const header = smallStageDebugElement.nativeElement.querySelector('.header span');
            expect(header.textContent).toBe('Header');
        });
    });

    describe('appearance', () => {
        it('has default appearance', () => {
            createTestComponent(BasicSmallStage);
            expect(smallStageInstance.appearance).toBe('default');
        });

        it('has expert appearance', () => {
            createTestComponent(ExpertSmallStage);
            expect(smallStageInstance.appearance).toBe('expert');
            expect(smallStageDebugElement.nativeElement).toHaveClass('is-expert');
        });
    });

    describe('narrow', () => {
        it('has no small text by default', () => {
            createTestComponent(BasicSmallStage);
            expect(smallStageInstance.narrow).toBeFalse();
        });

        it('has narrow content', () => {
            createTestComponent(SmallTextSmallStage);
            expect(smallStageInstance.narrow).toBeTrue();
            expect(smallStageDebugElement.nativeElement).toHaveClass('is-narrow');
        });
    });

    describe('a11y', () => {
        it('has no accessibility violations', async () => {
            createTestComponent(BasicSmallStage);
            await expectAsync(fixture.nativeElement).toBeAccessible();
        });
    });
});

@Component({
    template: `
        <nx-small-stage>
            <span nxSmallStageHeader>Header</span>
            <nx-small-stage-image nxSmallStageImageStart src="foo"></nx-small-stage-image>
            text
            <nx-small-stage-image nxSmallStageImageEnd src="bar"></nx-small-stage-image>
            <nx-small-stage-image nxSmallStageImageBottom src="baz"></nx-small-stage-image>
        </nx-small-stage>
    `,
})
class BasicSmallStage extends SmallStageTest {}

@Component({
    template: `
        <nx-small-stage appearance="expert">
            <span nxSmallStageHeader>Header</span>
            <nx-small-stage-image nxSmallStageImageStart src="foo"></nx-small-stage-image>
            text
            <nx-small-stage-image nxSmallStageImageEnd src="bar"></nx-small-stage-image>
        </nx-small-stage>
    `,
})
class ExpertSmallStage extends SmallStageTest {}

@Component({
    template: `
        <nx-small-stage narrow>
            <span nxSmallStageHeader>Header</span>
            <nx-small-stage-image nxSmallStageImageStart src="foo"></nx-small-stage-image>
            text
            <nx-small-stage-image nxSmallStageImageEnd src="bar"></nx-small-stage-image>
        </nx-small-stage>
    `,
})
class SmallTextSmallStage extends SmallStageTest {}
