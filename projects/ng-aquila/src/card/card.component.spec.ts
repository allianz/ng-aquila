import { ChangeDetectionStrategy, Component, Directive, Type, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { NxCardComponent } from './card.component';
import { NxCardModule } from './card.module';

@Directive()
abstract class CardTest {
    @ViewChild(NxCardComponent) cardInstance!: NxCardComponent;
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

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                declarations: [BasicCard],
                imports: [NxCardModule],
            }).compileComponents();
        }),
    );

    it(
        'creates the component',
        waitForAsync(() => {
            createTestComponent(BasicCard);
            expect(cardInstance).toBeTruthy();
        }),
    );

    describe('basic card', () => {
        beforeEach(() => {
            createTestComponent(BasicCard);
        });

        it('has no tabindex attribute', () => {
            expect(cardNativeElement.getAttribute('tabindex')).toBe(null);
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
