import { ChangeDetectionStrategy, Component, computed } from '@angular/core';

import { injectSurface } from './inject-surface';

/** Reports what a component inside a surface resolves. */
@Component({
  selector: 'nx-surface-probe',
  standalone: true,
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[attr.data-resolved-surface]': 'surface()',
    '[attr.data-resolved-accent]': 'accentColor() ?? null',
  },
})
export class SurfaceProbeComponent {
  readonly resolved = injectSurface();

  readonly surface = computed(() => this.resolved().surface);

  readonly accentColor = computed(() => {
    const resolved = this.resolved();
    return resolved.surface === 'accent-attention' ? resolved.accentColor : undefined;
  });
}
