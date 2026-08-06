import {
  NxButtonComponent,
  NxButtonAccentColor,
  NxButtonColorScheme,
  NxPlainButtonColorScheme,
  NxPlainButtonComponent,
} from '@allianz/ng-aquila/button';
import { NxHeadlineComponent } from '@allianz/ng-aquila/headline';
import { Component } from '@angular/core';

/**
 * @title Button A1 full showcase
 */
@Component({
  selector: 'button-a1-showcase-example',
  templateUrl: './button-a1-showcase-example.html',
  styleUrls: ['./button-a1-showcase-example.css'],
  imports: [NxHeadlineComponent, NxButtonComponent, NxPlainButtonComponent],
})
export class ButtonA1ShowcaseExampleComponent {
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

  readonly prominences = ['primary', 'secondary', 'tertiary'] as const;

  readonly accentSchemes: NxButtonColorScheme[] = [
    'accent-attention',
    'on-accent-attention',
  ];

  readonly modifierRows = [
    { label: 'critical', critical: true, disabled: false },
    { label: 'disabled', critical: false, disabled: true },
  ] as const;

  readonly sampleAccentColor: NxButtonAccentColor = 'blue';

  readonly plainVariants = ['primary', 'secondary'] as const;

  readonly plainSchemes: NxPlainButtonColorScheme[] = [
    'default',
    'on-accent-attention',
    'on-brand',
  ];

  cellSurface(
    scheme: NxButtonColorScheme,
    color: NxButtonAccentColor,
    inverse = false,
  ): string | null {
    if (scheme !== 'on-accent-attention') {
      return null;
    }
    return inverse
      ? `var(--color-attention-inverse-${color})`
      : `var(--color-attention-${color})`;
  }
  // color-attention-inverse-yellow);
  plainCellSurface(
    scheme: NxPlainButtonColorScheme,
    inverse = false,
  ): string | null {
    if (scheme === 'on-accent-attention') {
      return inverse
        ? `var(--color-attention-inverse-yellow)`
        : `var(--color-attention-yellow)`;
    }
    if (scheme === 'on-brand') {
      return inverse ? 'var(--color-brand-inverse)' : 'var(--color-brand)';
    }
    return null;
  }
}
