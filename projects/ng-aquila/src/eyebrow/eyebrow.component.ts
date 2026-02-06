import { booleanAttribute, ChangeDetectionStrategy, Component, input } from '@angular/core';

export type NxEyebrowSize = 's' | 'm';

@Component({
  selector: 'nx-eyebrow, [nxEyebrow]',
  templateUrl: './eyebrow.component.html',
  styleUrls: ['eyebrow.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.nx-eyebrow-size-s]': 'size() === "s"',
    '[class.nx-eyebrow-size-m]': 'size() === "m"',
    '[class.nx-eyebrow-inverse]': 'inverse()',
  },
})
export class NxEyebrowComponent {
  readonly size = input<NxEyebrowSize>('m');

  readonly inverse = input(false, { transform: booleanAttribute });
}
