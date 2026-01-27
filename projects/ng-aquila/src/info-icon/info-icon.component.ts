import { NxPlainButtonComponent } from '@allianz/ng-aquila/button';
import { NxIconModule } from '@allianz/ng-aquila/icon';
import {
  NxPopoverComponent,
  NxPopoverTriggerDirective,
  PopoverDirection,
} from '@allianz/ng-aquila/popover';
import { NgTemplateOutlet } from '@angular/common';
import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  input,
  viewChild,
} from '@angular/core';

/**
 * Info Icon component that combines a button with a popover.
 * Displays an info icon button that triggers a popover with additional information.
 */
@Component({
  selector: 'nx-info-icon',
  templateUrl: './info-icon.component.html',
  styleUrls: ['./info-icon.component.scss'],
  exportAs: 'nxInfoIcon',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    NgTemplateOutlet,
    NxIconModule,
    NxPopoverComponent,
    NxPopoverTriggerDirective,
    NxPlainButtonComponent,
  ],
})
export class NxInfoIconComponent {
  /** Reference to the popover component. */
  readonly popover = viewChild.required(NxPopoverComponent);

  /** Aria label for the info icon button. */
  readonly buttonAriaLabel = input<string>('Information');

  /** Direction where the popover should appear relative to the button. */
  readonly popoverDirection = input<PopoverDirection>('top');

  /** Width of the popover. */
  readonly popoverWidth = input<string | undefined>(undefined);

  /** Maximum width of the popover. */
  readonly popoverMaxWidth = input<string | undefined>(undefined);

  /** Whether the popover should be modal (with backdrop and focus trap). */
  readonly popoverModal = input(false, { transform: booleanAttribute });

  /** Whether the info icon button is disabled. */
  readonly disabled = input(false, { transform: booleanAttribute });
}
