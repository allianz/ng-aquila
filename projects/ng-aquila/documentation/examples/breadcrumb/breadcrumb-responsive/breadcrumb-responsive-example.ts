import {
  NxBreadcrumbComponent,
  NxBreadcrumbItemComponent,
} from '@allianz/ng-aquila/breadcrumb';
import { NxIconModule } from '@allianz/ng-aquila/icon';
import {
  afterNextRender,
  ChangeDetectorRef,
  Component,
  computed,
  DestroyRef,
  ElementRef,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { RouterLink } from '@angular/router';

interface BreadcrumbLink {
  readonly label: string;
  readonly link: string;
}

/**
 * @title Responsive breadcrumb
 */
@Component({
  selector: 'breadcrumb-responsive-example',
  templateUrl: './breadcrumb-responsive-example.html',
  styleUrls: ['./breadcrumb-responsive-example.css'],
  imports: [
    NxBreadcrumbComponent,
    NxBreadcrumbItemComponent,
    NxIconModule,
    RouterLink,
  ],
})
export class BreadcrumbResponsiveExampleComponent {
  readonly items: readonly BreadcrumbLink[] = [
    { label: 'Home', link: '#' },
    { label: 'Insurance', link: '#' },
    { label: 'Health Insurance', link: '#' },
    { label: 'Supplementary Insurance', link: '#' },
    { label: 'Dental Treatment', link: '#' },
    { label: 'Tariff Overview', link: '#' },
  ];

  private readonly _cdr = inject(ChangeDetectorRef);
  private readonly _container =
    viewChild.required<ElementRef<HTMLElement>>('container');
  private readonly _list = viewChild.required<
    NxBreadcrumbComponent,
    ElementRef<HTMLOListElement>
  >('list', { read: ElementRef });

  private readonly _lastIndex = this.items.length - 1;
  private readonly _maxCollapsed = Math.max(this.items.length - 2, 0);
  readonly collapsedCount = signal(0);

  readonly lastItem = this.items[this._lastIndex];
  readonly leadingItems = computed(() =>
    this.items.slice(0, this._lastIndex - this.collapsedCount()),
  );
  readonly hiddenItems = computed(() =>
    this.items.slice(this._lastIndex - this.collapsedCount(), this._lastIndex),
  );

  constructor() {
    const destroyRef = inject(DestroyRef);

    afterNextRender(() => {
      const observer = new ResizeObserver(() => this._fit());
      observer.observe(this._container().nativeElement);
      destroyRef.onDestroy(() => observer.disconnect());
    });
  }

  private _fit(): void {
    const list = this._list().nativeElement;
    this.collapsedCount.set(0);
    this._cdr.detectChanges();
    while (
      list.scrollWidth > list.clientWidth &&
      this.collapsedCount() < this._maxCollapsed
    ) {
      this.collapsedCount.update((count) => count + 1);
      this._cdr.detectChanges();
    }
  }
}
