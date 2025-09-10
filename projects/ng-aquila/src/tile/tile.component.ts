import { NxIconModule } from '@allianz/ng-aquila/icon';
import {
  NxCheckboxIndicatorComponent,
  NxRadioIndicatorComponent,
} from '@allianz/ng-aquila/selection';
import { IdGenerationService } from '@allianz/ng-aquila/utils';
import { FocusMonitor } from '@angular/cdk/a11y';
import {
  Component,
  computed,
  ElementRef,
  inject,
  input,
  OnDestroy,
  OnInit,
  output,
  viewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NxTileGroupComponent, NxTileSelectionMode } from './tile-group.component';

export type NxTileLayout = 'horizontal' | 'vertical';

/**
 * Represents a tile component with selectable, readonly, and disabled states.
 */
@Component({
  selector: 'nx-tile',
  standalone: true,
  imports: [NxIconModule, NxCheckboxIndicatorComponent, NxRadioIndicatorComponent, FormsModule],
  templateUrl: './tile.component.html',
  styleUrls: ['./tile.component.scss'],
  host: {
    '[class.nx-tile]': 'true',
    '[class.is-selected]': 'selected()',
    '[class.is-disabled]': 'disabled()',
    '[class.is-readonly]': 'readonly()',
    '[class.has-error]': 'errorState()',
    '[class.has-icon]': 'icon()',
    '[class.layout-vertical]': "tileGroup?.tileLayout() === 'vertical'",
    '[class.layout-horizontal]': "tileGroup?.tileLayout() === 'horizontal'",
    '[attr.tabindex]': '-1',
    '[attr.role]': "'group'",
    '[attr.aria-disabled]': 'disabled() || readonly() || null',
  },
})
export class NxTileComponent implements OnInit, OnDestroy {
  protected readonly inputElement = viewChild.required<HTMLInputElement>('tileInput');

  /** Unique ID for the tile. */
  readonly id = inject(IdGenerationService).nextId('nx-tile');

  /** Icon to display in the tile. */
  readonly icon = input<string>('');

  /** Label text for the tile. */
  readonly label = input<string | null>(null);

  /** Hint text for the tile. */
  readonly hint = input<string | null>(null);

  /** Disabled input, can be overridden by group. */
  readonly disabledInput = input(false, { alias: 'disabled' });
  /** Readonly input, can be overridden by group. */
  readonly readonlyInput = input(false, { alias: 'readonly' });

  /** Value of the tile (used for selection in a group). */
  readonly value = input<any>(null);

  /** Event emitted when the tile is selected or deselected. */
  readonly selectionChange = output<any>();

  /** Whether the tile is selected. */
  readonly selected = computed(() => {
    if (Array.isArray(this.tileGroup.value())) {
      return this.tileGroup.value().includes(this.value());
    }
    return this.tileGroup.value() === this.value();
  });

  /* The combined hint and error ids as space separated string. */
  readonly ariaDescribedBy = computed(() => {
    const hintId = this.hint() ? `${this.id}-hint` : null;
    const errorIds = this.tileGroup._errorState() ? this.tileGroup.errorIds() : null;
    return [hintId, errorIds].filter(Boolean).join(' ') || null;
  });

  /** Computed: true if group is disabled, else use own input. */
  readonly disabled = computed(() => this.tileGroup.disabled() || this.disabledInput());
  /** Computed: true if group is readonly, else use own input. */
  readonly readonly = computed(() => this.tileGroup.readonly() || this.readonlyInput());

  /** Error state: uses group error state signal if present, otherwise false. */
  readonly errorState = computed(() => this.tileGroup?._errorState() ?? false);

  /** Signal for the selection mode of the parent group, or null if not in a group. */
  protected readonly selectionMode = computed<NxTileSelectionMode>(
    () => this.tileGroup.selectionMode() ?? 'multi',
  );

  protected readonly tileGroup = inject(NxTileGroupComponent);
  protected readonly focusMonitor = inject(FocusMonitor);
  protected readonly nativeElement = inject(ElementRef).nativeElement;

  /** Toggles the selection state of the tile. */
  toggleSelection(event: Event): void {
    if (this.disabled() || this.readonly()) {
      event.preventDefault();
    } else {
      this.selectionChange.emit(this.value());
    }
  }

  ngOnInit(): void {
    this.focusMonitor.monitor(this.nativeElement, true);
  }

  ngOnDestroy(): void {
    this.focusMonitor.stopMonitoring(this.nativeElement);
  }

  touch() {
    this.tileGroup.touch();
  }
}
