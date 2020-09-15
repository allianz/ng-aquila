import {
  ChangeDetectionStrategy,
  Component,
  Input,
  AfterContentInit,
  QueryList,
  ContentChildren
} from '@angular/core';
import { NxProgressStepperDirective, NxStepComponent } from '../progress-stepper.component';
import { NxMultiStepperGroupComponent } from './multi-step-group.component';

/** Direction of the multi stepper */
export type NxMultiStepperDirection = 'vertical' | 'horizontal';

@Component({
  selector: 'nx-multi-stepper',
  templateUrl: './multi-step.component.html',
  styleUrls: [
    '../progress-stepper.component.scss',
    './multi-step.component.scss'
  ],
  providers: [
    {
      provide: NxProgressStepperDirective,
      useExisting: NxMultiStepperComponent
    }
  ],
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.nx-multi-stepper--vertical]': 'direction === "vertical"'
  }
})
export class NxMultiStepperComponent extends NxProgressStepperDirective
  implements AfterContentInit {

  /** @docs-private */
  @ContentChildren(NxMultiStepperGroupComponent, { descendants: true })
  groups: QueryList<NxMultiStepperGroupComponent>;

  /** Sets the direction of the multi stepper. */
  @Input()
  get direction(): NxMultiStepperDirection {
    return this._direction;
  }
  set direction(value: NxMultiStepperDirection) {
    this._direction = value;
  }
  private _direction: NxMultiStepperDirection = 'horizontal';

  ngAfterContentInit() {
    super.ngAfterContentInit();

    if (this.groups.length) {
      this.steps.reset(this._stepsInGroups);
      this.steps.notifyOnChanges();
    }

    this.groups.changes.subscribe(() => {
      this.steps.reset(this._stepsInGroups);
      this.steps.notifyOnChanges();
    });
  }

  _stepDisabled(index: number): boolean {
    const steps = this.steps.toArray();

    if (this.linear && index >= 0) {
      return steps.slice(0, index).some(step => {
        const control = step.stepControl;
        const isIncomplete = control
          ? control.invalid || control.pending || !step.interacted
          : !step.completed;
        return isIncomplete && !step.optional;
      });
    }

    return false;
  }

  private get _stepsInGroups(): NxStepComponent[] {
    if (this.groups.length) {
      return this.groups
        .reduce((steps, group) => steps.concat(group.steps.toArray()), []);
    }

    return [];
  }

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
