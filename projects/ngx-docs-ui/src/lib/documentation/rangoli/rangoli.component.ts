import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'nxv-rangoli',
  template: `
    <svg viewBox="-100 -100 200 200" focusable="false" aria-hidden="true">
      @for (petal of _petals; track petal) {
        <g [attr.transform]="'rotate(' + petal * 30 + ')'">
          <ellipse cy="-62" rx="14" ry="30" [attr.fill]="petal % 2 ? '#e0218a' : '#ff7a00'" />
          <ellipse cy="-58" rx="6" ry="16" fill="#ffd166" />
          <circle cy="-94" r="4" fill="#2ec4b6" />
        </g>
      }
      @for (petal of _petals; track petal) {
        <ellipse
          cy="-30"
          rx="9"
          ry="18"
          [attr.transform]="'rotate(' + (petal * 30 + 15) + ')'"
          [attr.fill]="petal % 2 ? '#7b2cbf' : '#2ec4b6'"
        />
      }
      <circle r="24" fill="#ffb627" />
      <circle r="15" fill="#e0218a" />
      <circle r="7" fill="#fff4e0" />
    </svg>
  `,
  styles: `
    :host {
      display: block;
    }

    svg {
      display: block;
      width: 100%;
      height: 100%;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NxvRangoliComponent {
  protected readonly _petals = Array.from({ length: 12 }, (_, i) => i);
}
