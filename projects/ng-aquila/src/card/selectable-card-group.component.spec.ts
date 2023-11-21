import { Component, Directive, QueryList, Type, ViewChildren } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NxErrorModule } from '@aposin/ng-aquila/base';

import { NxCardModule } from './card.module';
import { NxSelectableCardComponent } from './selectable-card.component';

@Directive()
abstract class SelectableCardTest {
    @ViewChildren(NxSelectableCardComponent) cardList!: QueryList<NxSelectableCardComponent>;

    formGroup!: FormGroup;
}

describe('NxSelectableCardGroupComponent', () => {
    let fixture: ComponentFixture<SelectableCardTest>;
    let testInstance: SelectableCardTest;
    let fixtureElement: HTMLElement;

    function createTestComponent(component: Type<SelectableCardTest>) {
        fixture = TestBed.createComponent(component);
        fixture.detectChanges();
        testInstance = fixture.componentInstance;
        fixtureElement = fixture.nativeElement;
    }

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [BasicSelectableCardGroup],
            imports: [NxCardModule, FormsModule, ReactiveFormsModule, NxErrorModule],
        }).compileComponents();
    }));

    it('Should select only one card', () => {
        createTestComponent(BasicSelectableCardGroup);
        testInstance.formGroup.setValue({
            radio: 'a',
        });
        fixture.detectChanges();
        testInstance.formGroup.setValue({
            radio: 'b',
        });
        fixture.detectChanges();

        expect(testInstance.cardList.filter(c => c.checked).length).toBe(1);
        expect(testInstance.cardList.get(1)?.checked).toBeTrue();
    });

    it('toggles error states accordingly when in a reactive form', fakeAsync(() => {
        createTestComponent(BasicSelectableCardGroup);
        expect(fixtureElement.querySelector('.nx-error--message')).not.toBeTruthy();
        testInstance.formGroup.markAllAsTouched();

        fixture.detectChanges();
        tick();
        expect(fixtureElement.querySelector('.nx-error--message')).toBeTruthy();
    }));
});

@Component({
    template: `
        <form [formGroup]="formGroup">
            <nx-selectable-card-group formControlName="radio" name="radio-group">
                <div *ngFor="let card of cards; index as i">
                    <nx-selectable-card [value]="card">
                        {{ card.title }}
                    </nx-selectable-card>
                </div>
                <nx-error> This card must be selected. </nx-error>
            </nx-selectable-card-group>
        </form>
    `,
})
class BasicSelectableCardGroup extends SelectableCardTest {
    cards = ['a', 'b', 'c'];

    fb = new FormBuilder();

    readonly formGroup = this.fb.group({
        radio: [null, Validators.required],
    });
}
