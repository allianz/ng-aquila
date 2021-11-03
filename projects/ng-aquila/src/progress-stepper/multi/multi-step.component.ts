import { NxMultiStepItemComponent } from './multi-step-item.component';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  AfterContentInit,
  QueryList,
  ContentChildren,
  ViewChildren,
  AfterViewChecked
} from '@angular/core';
import { NxProgressStepperDirective, NxStepComponent } from '../progress-stepper.component';
import { NxMultiStepperGroupComponent } from './multi-step-group.component';
import { NxMultiStepperDirection } from '../progress-stepper.models';

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
  implements AfterContentInit, AfterViewChecked {

  /**
   * We need to set the _stepHeader property as ViewChildren here
   * as it is a ContentChildren query in the CDK
   */
  @ViewChildren(NxMultiStepItemComponent) _stepHeader!: QueryList<NxMultiStepItemComponent>;

  /** @docs-private */
  @ContentChildren(NxMultiStepperGroupComponent, { descendants: true })
  groups!: QueryList<NxMultiStepperGroupComponent>;

  /** Sets the direction of the multi stepper. */
  @Input()
  get direction(): NxMultiStepperDirection {
    return this._direction;
  }
  set direction(value: NxMultiStepperDirection) {
    this._direction = value;
  }
  private _direction: NxMultiStepperDirection = 'horizontal';

  ngAfterViewChecked() {
    // the _keyManager is currently private in the CdkStepper and the CDK/Material way
    // is to create to separate components for the vertical and horizontal stepper with no
    // possibility to change it during runtime
    // opened a ticket: https://github.com/angular/components/issues/21874
    // for now the quick solution is the hacky way to access the private property
    this['_keyManager'].withVerticalOrientation(this._direction === 'vertical');
  }

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
        .reduce<NxStepComponent[]>((steps, group) => steps.concat(group.steps.toArray()), []);
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
