import { ChangeDetectionStrategy, Component, Directive, Type, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NxCardComponent } from './card.component';
import { NxCardModule } from './card.module';

@Directive()
abstract class CardTest {
    @ViewChild(NxCardComponent) cardInstance!: NxCardComponent;
    isDisabled = false;
    isClickable = false;
}

describe('NxCardComponent', () => {
    let fixture: ComponentFixture<CardTest>;
    let testInstance: CardTest;
    let cardInstance: NxCardComponent;
    let cardNativeElement: HTMLButtonElement;

    function createTestComponent(component: Type<CardTest>) {
        fixture = TestBed.createComponent(component);
        fixture.detectChanges();
        testInstance = fixture.componentInstance;
        cardInstance = testInstance.cardInstance;
        cardNativeElement = fixture.nativeElement.querySelector('nx-card') as HTMLButtonElement;
    }

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [BasicCard, ClickableCardTest],
            imports: [NxCardModule],
        }).compileComponents();
    }));

    it('creates the component', waitForAsync(() => {
        createTestComponent(BasicCard);
        expect(cardInstance).toBeTruthy();
    }));

    describe('basic card', () => {
        beforeEach(() => {
            createTestComponent(BasicCard);
        });

        it('has no tabindex attribute', () => {
            expect(cardNativeElement.getAttribute('tabindex')).toBeNull();
        });
    });

    describe('clickable card', () => {
        beforeEach(() => {
            createTestComponent(ClickableCardTest);
        });

        it('has is-clickable class when clickable & disabled is false', () => {
            const card = fixture.nativeElement.querySelector('nx-card');

            testInstance.isClickable = true;
            testInstance.isDisabled = false;
            fixture.detectChanges();

            expect(card).toHaveClass('is-clickable');
            expect(card).not.toHaveClass('is-disabled');
        });

        it('should set aria-disabled on the main link', () => {
            testInstance.isDisabled = true;
            fixture.detectChanges();
            const link = fixture.nativeElement.querySelector('[nxcardmainlink');
            expect(link.getAttribute('aria-disabled')).toBe('true');
            expect(link.getAttribute('role')).toBe('link');
        });
    });

    describe('a11y', () => {
        it('expert card has no accessibility violations', async () => {
            createTestComponent(BasicCard);
            await expectAsync(fixture.nativeElement).toBeAccessible();
        });
    });
});

@Component({
    template: `<nx-card>Hello Text</nx-card>`,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
class BasicCard extends CardTest {}

@Component({
    template: `<nx-card [clickable]="isClickable" [disabled]="isDisabled"
        ><a href="/" nxCardMainLink>Card title</a>
        <p>Hello Text</p></nx-card
    >`,
})
class ClickableCardTest extends CardTest {}
