import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { NxCardModule } from '@aposin/ng-aquila/card';

import { createTestComponent } from './create-test-component';
import { NxSelectableCardGroupHarness } from './selectable-card-group-harness';

describe('NxSelectableCardGroupHarness', () => {
    it('should find all card groups', async () => {
        const { loader } = createTestComponent(`
            <nx-selectable-card-group />
            <nx-selectable-card-group />
        `);

        const groups = await loader.getAllHarnesses(NxSelectableCardGroupHarness);
        expect(groups.length).toBe(2);
    });

    it('should get all cards within group', async () => {
        const { loader } = createTestComponent(`
            <nx-selectable-card-group>
                <nx-selectable-card />
                <nx-selectable-card />
            </nx-selectable-card-group>
        `);

        const group = await loader.getHarness(NxSelectableCardGroupHarness);
        const cards = await group.getCards();

        expect(cards.length).toBe(2);
    });

    it('should get filtered cards within group', async () => {
        const { loader } = createTestComponent(`
            <nx-selectable-card-group value="BAR">
                <nx-selectable-card value="FOO"><h3>Foo</h3></nx-selectable-card>
                <nx-selectable-card value="BAR"><h3>Bar</h3></nx-selectable-card>
            </nx-selectable-card-group>
        `);

        const group = await loader.getHarness(NxSelectableCardGroupHarness);
        const cards = await group.getCards({ checked: true });

        expect(cards.length).toBe(1);
    });

    it('should get error', async () => {
        const fixture = TestBed.createComponent(ErrorTest);
        fixture.detectChanges();
        fixture.componentInstance.control.setErrors({ invalid: true });
        fixture.componentInstance.control.markAllAsTouched();
        fixture.detectChanges();
        const loader = TestbedHarnessEnvironment.loader(fixture);

        const group = await loader.getHarness(NxSelectableCardGroupHarness);
        expect(await group.getErrorText()).toBe('Error Text');
    });
});

@Component({
    template: `<nx-selectable-card-group [formControl]="control">
        <nx-selectable-card><h3>Foo</h3></nx-selectable-card>
        <nx-selectable-card><h3>Bar</h3></nx-selectable-card>
        <nx-error>Error Text</nx-error>
    </nx-selectable-card-group>`,
    standalone: true,
    imports: [NxCardModule, ReactiveFormsModule],
})
class ErrorTest {
    control = new FormControl();
}
