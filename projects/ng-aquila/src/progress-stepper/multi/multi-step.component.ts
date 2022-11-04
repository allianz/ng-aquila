import { Directionality } from '@angular/cdk/bidi';
import {
    AfterContentInit,
    AfterViewChecked,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ContentChildren,
    ElementRef,
    Input,
    OnDestroy,
    Optional,
    QueryList,
    ViewChildren,
} from '@angular/core';
import { takeUntil } from 'rxjs/operators';

import { NxProgressStepperDirective, NxStepComponent } from '../progress-stepper.component';
import { NxMultiStepperDirection } from '../progress-stepper.models';
import { NxMultiStepperGroupComponent } from './multi-step-group.component';
import { NxMultiStepItemComponent } from './multi-step-item.component';

@Component({
    selector: 'nx-multi-stepper',
    templateUrl: './multi-step.component.html',
    styleUrls: ['../progress-stepper.component.scss', './multi-step.component.scss'],
    providers: [{ provide: NxProgressStepperDirective, useExisting: NxMultiStepperComponent }],
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        '[class.nx-multi-stepper--vertical]': 'direction === "vertical"',
    },
})
export class NxMultiStepperComponent extends NxProgressStepperDirective implements OnDestroy, AfterContentInit, AfterViewChecked {
    /**
     * We need to set the `_stepHeader` property as `ViewChildren` here as it is a `ContentChildren` query in the CDK.
     */
    @ViewChildren(NxMultiStepItemComponent) _stepHeader!: QueryList<NxMultiStepItemComponent>;

    /** @docs-private */
    @ContentChildren(NxMultiStepperGroupComponent, { descendants: true }) groups!: QueryList<NxMultiStepperGroupComponent>;

    /** Sets the direction of the multi stepper. */
    @Input() set direction(value: NxMultiStepperDirection) {
        this._direction = value;
    }
    get direction(): NxMultiStepperDirection {
        return this._direction;
    }
    private _direction: NxMultiStepperDirection = 'horizontal';

    constructor(_cdr: ChangeDetectorRef, @Optional() _dir: Directionality | null, _el: ElementRef<HTMLElement>) {
        super(_cdr, _dir, _el);
    }

    ngAfterViewChecked(): void {
        // the _keyManager is currently private in the CdkStepper and the CDK/Material way
        // is to create to separate components for the vertical and horizontal stepper with no
        // possibility to change it during runtime
        // opened a ticket: https://github.com/angular/components/issues/21874
        // for now the quick solution is the hacky way to access the private property

        // eslint-disable-next-line @typescript-eslint/dot-notation
        this['_keyManager'].withVerticalOrientation(this._direction === 'vertical'); // workaround: accessing private class member
    }

    ngAfterContentInit(): void {
        super.ngAfterContentInit();

        if (this.groups.length) {
            this.steps.reset(this._stepsInGroups);
            this.steps.notifyOnChanges();
        }

        this.groups.changes.pipe(takeUntil(this._destroyed)).subscribe(() => {
            this.steps.reset(this._stepsInGroups);
            this.steps.notifyOnChanges();
        });
    }

    ngOnDestroy(): void {
        this._destroyed.next();
        this._destroyed.complete();
    }

    _stepDisabled(index: number): boolean {
        const steps = this.steps.toArray();

        if (this.linear && index >= 0) {
            return steps.slice(0, index).some(step => {
                const control = step.stepControl;
                const isIncomplete = control ? control.invalid || control.pending || !step.interacted : !step.completed;
                return isIncomplete && !step.optional;
            });
        }

        return false;
    }

    private get _stepsInGroups(): NxStepComponent[] {
        if (this.groups.length) {
            return this.groups.reduce<NxStepComponent[]>((steps, group) => steps.concat(group.steps.toArray()), []);
        }

        return [];
    }

    // Returns the index of a certain step
    _getIndex(step: NxStepComponent): number {
        return this.steps.toArray().indexOf(step);
    }

    _isGroupActive(groupIndex: number) {
        return this.selectedIndex >= this.getGroupItemIndex(groupIndex);
    }

    _isGroupDisabled(groupIndex: number) {
        return this._stepDisabled(this.getGroupItemIndex(groupIndex));
    }

    private getGroupItemIndex(groupIndex: number): number {
        let count = 0;
        const groups = this.groups.toArray();

        for (let i = 0; i < groupIndex; i++) {
            count += groups[i].steps.length;
        }

        return count;
    }
}
