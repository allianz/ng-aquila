import { Directionality } from '@angular/cdk/bidi';
import { coerceNumberProperty, NumberInput } from '@angular/cdk/coercion';
import { CdkTree, CdkTreeNode } from '@angular/cdk/tree';
import {
  computed,
  Directive,
  ElementRef,
  Input,
  OnDestroy,
  Optional,
  Renderer2,
  signal,
} from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

/** Regex used to split a string on its CSS units. */
const cssUnitPattern = /([%A-Z]+)$/i;

/**
 * Indent for the children tree dataNodes.
 * This directive will add left-padding to the node to show hierarchy.
 */
@Directive({
  selector: '[nxTreeNodePadding]',
  host: {
    '[class.nx-tree-node--with-padding]': 'true',
    '[style]': 'getIndentStyle()',
  },
  standalone: true,
})
export class NxTreeNodePaddingDirective<T> implements OnDestroy {
  protected getIndentStyle = computed(() => {
    const arrowSize = '(var(--action-expand-icon-size) + var(--action-expand-icon-gap))';
    const indent = this._indent() ? this._indent() + this.indentUnits : arrowSize;
    const level = this._level() || this.getIntristicNodeLevel();
    const offset = this._offset() ? ` + ${this._offset()}${this.indentUnits}` : '';
    const calc = `calc((var(--action-padding-left) * 2) + ${indent} * ${level}${offset})`;
    if (!level) {
      return;
    }

    if (this.isLTR()) {
      return {
        'padding-left': calc,
        'padding-right': null,
      };
    }
    return {
      'padding-right': calc,
      'padding-left': null,
    };
  });
  /** CSS units used for the indentation value. */
  indentUnits = 'px';

  /** The level of depth of the tree node. The padding will be `level * indent` pixels. */
  @Input('nxTreeNodePadding') set level(value: NumberInput) {
    this._level.set(coerceNumberProperty(value));
  }
  get level(): number {
    return this._level();
  }
  private readonly _level = signal<number>(0);

  /** The offset is added once on top of each indent. Default number is 0. */
  @Input('nxTreeNodePaddingOffset') set offset(value: NumberInput) {
    this._offset.set(coerceNumberProperty(value));
  }
  get offset(): number {
    return this._offset();
  }
  _offset = signal(0);

  /**
   * The indent for each level. Can be a number or a CSS string.
   * Default number 24px from material design menu sub-menu spec.
   */
  @Input('nxTreeNodePaddingIndent') set indent(indent: NumberInput) {
    let value = indent;
    let units = 'px';

    if (typeof indent === 'string') {
      const parts = indent.split(cssUnitPattern);
      value = parts[0];
      units = parts[1] || units;
    }

    this.indentUnits = units;
    this._indent.set(coerceNumberProperty(value));
  }
  get indent(): number {
    return this._indent();
  }
  _indent = signal(0);

  private readonly _destroyed = new Subject<void>();

  private readonly isLTR = signal(true);

  constructor(
    private readonly _treeNode: CdkTreeNode<T>,
    private readonly _tree: CdkTree<T>,
    private readonly _renderer: Renderer2,
    private readonly _element: ElementRef<HTMLElement>,
    @Optional() private readonly _dir: Directionality | null,
  ) {
    if (this._dir) {
      this._dir.change.pipe(takeUntil(this._destroyed)).subscribe((direction) => {
        this.isLTR.set(direction === 'ltr');
      });
    }
  }

  ngOnDestroy(): void {
    this._destroyed.next();
    this._destroyed.complete();
  }

  private getIntristicNodeLevel(): number {
    return this._treeNode.data && this._tree.treeControl && this._tree.treeControl.getLevel
      ? this._tree.treeControl.getLevel(this._treeNode.data)
      : 0;
  }
}
