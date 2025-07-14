import { NxSwitcherComponent } from '@allianz/ng-aquila/switcher';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

/** @title Switcher readonly */
@Component({
  selector: 'switcher-readonly-example',
  templateUrl: './switcher-readonly-example.html',
  styleUrl: './switcher-readonly-example.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormsModule, ReactiveFormsModule, NxSwitcherComponent],
})
export class SwitcherReadonlyExampleComponent {}
