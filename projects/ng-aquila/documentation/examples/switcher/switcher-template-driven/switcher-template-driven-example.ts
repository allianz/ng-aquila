import { NxSwitcherComponent } from '@allianz/ng-aquila/switcher';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

/** @title Switcher Template Driven Form */
@Component({
  selector: 'switcher-template-driven-example',
  templateUrl: './switcher-template-driven-example.html',
  styleUrls: ['./switcher-template-driven-example.css'],
  imports: [FormsModule, NxSwitcherComponent],
})
export class SwitcherTemplateDrivenExampleComponent {
  templateModel = true;
}
