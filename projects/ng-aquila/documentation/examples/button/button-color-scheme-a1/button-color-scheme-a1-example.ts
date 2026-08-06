import {
  NxButtonComponent,
  NxButtonAccentColor,
  NxButtonColorScheme,
  NxButtonType,
  NxIconButtonComponent,
} from '@allianz/ng-aquila/button';
import {
  NxDropdownComponent,
  NxDropdownItemComponent,
} from '@allianz/ng-aquila/dropdown';
import {
  NxFormfieldComponent,
  NxFormfieldHintDirective,
} from '@allianz/ng-aquila/formfield';
import {
  NxColComponent,
  NxLayoutComponent,
  NxRowComponent,
} from '@allianz/ng-aquila/grid';
import { NxIconComponent } from '@allianz/ng-aquila/icon';
import { Component, computed, signal } from '@angular/core';

/**
 * @title Contained Button color schemes
 */
@Component({
  selector: 'button-color-scheme-a1-example',
  templateUrl: './button-color-scheme-a1-example.html',
  styleUrls: ['./button-color-scheme-a1-example.css'],
  imports: [
    NxButtonComponent,
    NxIconButtonComponent,
    NxIconComponent,
    NxDropdownComponent,
    NxDropdownItemComponent,
    NxFormfieldComponent,
    NxFormfieldHintDirective,
    NxLayoutComponent,
    NxRowComponent,
    NxColComponent,
  ],
})
export class ButtonColorSchemeA1ExampleComponent {
  /** The prominences shown in the preview. */
  readonly prominences: NxButtonType[] = ['primary', 'secondary', 'tertiary'];

  readonly colorSchemes: NxButtonColorScheme[] = [
    'default',
    'accent-attention',
    'on-accent-attention',
  ];

  readonly accentColors: NxButtonAccentColor[] = [
    'yellow',
    'orange',
    'red',
    'purple',
    'aqua',
    'blue',
    'teal',
    'green',
    'gray',
  ];

  readonly colorScheme = signal<NxButtonColorScheme>('accent-attention');
  readonly accentColor = signal<NxButtonAccentColor>('green');

  /** The accent color only applies to the accent color schemes. */
  readonly accentColorDisabled = computed(
    () => this.colorScheme() === 'default',
  );

  /** on-accent-attention buttons are meant to sit on an accent surface. */
  readonly onAccentSurface = computed(
    () => this.colorScheme() === 'on-accent-attention',
  );

  /** The matching accent surface color for the on-accent-attention preview. */
  readonly accentSurface = computed(
    () =>
      `var(--semantic-color-accent-attention-${this.accentColor()}-resting)`,
  );
}
