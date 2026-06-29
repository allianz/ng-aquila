import { NxButtonComponent } from '@allianz/ng-aquila/button';
import {
  NxContextMenuModule,
  NxContextMenuTriggerDirective,
} from '@allianz/ng-aquila/context-menu';
import { NxIconComponent } from '@allianz/ng-aquila/icon';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  signal,
} from '@angular/core';

type DamageArea = 'front' | 'driver' | 'rear';

/**
 * @title Context Menu Multi Selectable Example
 */
@Component({
  selector: 'context-menu-multi-selectable-example',
  templateUrl: './context-menu-multi-selectable-example.html',
  styleUrls: ['./context-menu-multi-selectable-example.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NxContextMenuModule,
    NxIconComponent,
    NxButtonComponent,
    NxContextMenuTriggerDirective,
  ],
})
export class ContextMenuMultiSelectableExampleComponent {
  readonly options: { value: DamageArea; label: string }[] = [
    { value: 'front', label: 'Front window' },
    { value: 'driver', label: 'Driver Window' },
    { value: 'rear', label: 'Rear Window' },
  ];

  readonly selected = signal<Set<DamageArea>>(new Set<DamageArea>(['driver']));

  readonly selectedLabel = computed(() =>
    this.options
      .filter((o) => this.selected().has(o.value))
      .map((o) => o.label)
      .join(', '),
  );

  isSelected(value: DamageArea): boolean {
    return this.selected().has(value);
  }

  toggle(value: DamageArea): void {
    const next = new Set(this.selected());
    if (next.has(value)) {
      next.delete(value);
    } else {
      next.add(value);
    }
    this.selected.set(next);
  }
}
