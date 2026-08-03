import { ALLIANZ_ONE, AllianzOneOptions } from '@allianz/ng-aquila/config/allianz-one/token';
import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  inject,
  Input,
  input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { take } from 'rxjs/operators';

import { cloneSvg, NxIconFontDefinition, NxIconRegistry } from './icon-registry';
import { NxSvgIcon } from './icons';

/** Types of icon sizes */
export type IconSize = 'auto' | 's' | 'm' | 'l' | 'xl' | '2xl';

export type IconAccentColor =
  'yellow' | 'orange' | 'red' | 'purple' | 'aqua' | 'blue' | 'teal' | 'green' | 'gray';
export type NxIconType = 'auto' | 'primary' | 'secondary' | 'accent-attention' | 'accent-subtle';

@Component({
  selector: 'nx-icon',
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./icon.component.scss'],
  host: {
    '[class.nx-icon--outline]': '!a1Enabled() && (outline() || contained())',
    '[class.nx-icon--inverse]': 'a1Enabled() && inverse()',
    '[class.primary]': 'a1Enabled() && type() === "primary"',
    '[class.secondary]': 'a1Enabled() && type() === "secondary"',
    '[class.emphasis]': 'a1Enabled() && emphasis()',
    '[class.surface]': 'a1Enabled() && (outline() || contained() || emphasis())',
    '[class]': 'accentColorClass()',
    '[class.nx-icon--fill]': '!a1Enabled() && fill()',
    '[class.nx-icon--auto]': 'size() === "auto"',
    '[class.nx-icon--s]': 'size() === "s"',
    '[class.nx-icon--m]': 'size() === "m"',
    '[class.nx-icon--l]': 'size() === "l"',
    '[class.nx-icon--xl]': 'size() === "xl"',
    '[class.nx-icon--2xl]': 'size() === "2xl"',
    /** Provide a stable selector for getting icons by name or retrieving the name (primarily for harnesses) */
    '[attr.data-nx-icon-name]': 'name',
  },
  standalone: true,
})
export class NxIconComponent implements OnChanges {
  private readonly _allianzOneOptions = inject<AllianzOneOptions | null>(ALLIANZ_ONE, {
    optional: true,
  });

  protected readonly a1Enabled = computed<boolean>(
    () => this._allianzOneOptions?.enabled?.() || false,
  );

  /** Keeps track of the elements and attributes that we've prefixed with the current path. */
  private readonly _elementsWithExternalReferences?: Map<
    Element,
    { name: string; value: string }[]
  >;
  private _previousFontClasses: string[] = [];

  /** Sets the name for specifying the icon.*/
  @Input() set name(name: string) {
    this._name = name;
  }
  get name(): string {
    return this._name;
  }
  private _name = '';

  readonly type = input<NxIconType>('auto');

  /** Whether the icon has an outline. */
  readonly outline = input(false, { transform: booleanAttribute });

  readonly contained = input(false, { transform: booleanAttribute });

  readonly emphasis = input(false, { transform: booleanAttribute });

  readonly accentColor = input<IconAccentColor>('blue');
  readonly accentColorClass = computed(() => {
    const color = this.accentColor();
    let accentType = null;
    switch (this.type()) {
      case 'accent-attention':
        accentType = 'attention';
        break;
      case 'accent-subtle':
        accentType = 'subtle';
        break;
    }
    return color && accentType ? `${accentType}-${color}` : '';
  });
  /** Whether the icon is filled. */
  readonly fill = input(false, { transform: booleanAttribute });

  readonly inverseInput = input(false, { alias: 'inverse', transform: booleanAttribute });
  readonly inverse = computed(() => this.inverseInput() || this.fill());

  /**
   * Specifies the size of the icon.
   * Use 's' and 'm' for functional Icons and
   * 'l', 'xl' and '2xl' for illustrative icons.
   */
  readonly size = input<IconSize>('auto');

  /** Sets the font name that should be used. */
  readonly font = input('');

  constructor(
    /** @docs-private */ readonly el: ElementRef,
    private readonly _iconRegistry: NxIconRegistry,
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.name || changes.font) {
      this.renderIcon();
    }
  }

  private renderIcon() {
    const icon = this._iconRegistry.getIcon(this.name);
    if (!icon) {
      // here we fall back to the icon class so we look at the `font` input
      // or take the default font
      this._updateFontIconClasses();
      this._clearSvgElement();
    } else if (icon instanceof NxSvgIcon) {
      // add content
      icon
        .getContent()
        .pipe(take(1))
        .subscribe((content?: SVGElement) => {
          if (!content) {
            return;
          }

          // we need to clone the svg here otherwise when you have the same icon
          // multiple times it would end up only in the last icon that got created
          this._setSvgElement(cloneSvg(content));
        });
    } else {
      // here we have to look at the alias as well that could come from the registry
      this._updateFontIconClassesFromOverride(icon.alias, icon.font);
      this._clearSvgElement();
    }
  }

  private _setSvgElement(svg: SVGElement) {
    this._clearSvgElement();
    // Workaround for IE11 and Edge ignoring `style` tags inside dynamically-created SVGs.
    // See: https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/10898469/
    // Do this before inserting the element into the DOM, in order to avoid a style recalculation.
    const styleTags = svg.querySelectorAll('style');

    for (let i = 0; i < styleTags.length; i++) {
      styleTags[i].textContent += ' ';
    }
    this._removePreviousFontClasses();
    this.el.nativeElement.appendChild(svg);
  }

  private _clearSvgElement() {
    const layoutElement: HTMLElement = this.el.nativeElement;
    let childCount = layoutElement.childNodes.length;

    if (this._elementsWithExternalReferences) {
      this._elementsWithExternalReferences.clear();
    }

    // Remove existing non-element child nodes and SVGs, and add the new SVG element. Note that
    // we can't use innerHTML, because IE will throw if the element has a data binding.
    while (childCount--) {
      const child = layoutElement.childNodes[childCount];

      // 1 corresponds to Node.ELEMENT_NODE. We remove all non-element nodes in order to get rid
      // of any loose text nodes, as well as any SVG elements in order to remove any old icons.
      if (child.nodeType !== 1 || child.nodeName.toLowerCase() === 'svg') {
        layoutElement.removeChild(child);
      }
    }
  }

  private _updateFontIconClassesFromOverride(alias: string, font: NxIconFontDefinition) {
    const name = alias ? alias : this.name;
    this._setFontIconClasses([font.hostClass, font.prefix + name]);
  }

  private _updateFontIconClasses() {
    const fontValue = this.font();
    const font = fontValue
      ? this._iconRegistry.getFont(fontValue)
      : this._iconRegistry.getDefaultFont();
    const hostClass = font ? font.hostClass : '';
    const name = font ? font.prefix + this.name : this.name;
    this._setFontIconClasses([hostClass, name]);
  }

  private _setFontIconClasses(classes: string[]) {
    // filters empty classes as they cannot be added via classList.add
    const filteredClasses = classes.filter((c) => c !== '');

    const elem: HTMLElement = this.el.nativeElement;

    this._removePreviousFontClasses();
    this._previousFontClasses = filteredClasses;
    filteredClasses.forEach((cl) => elem.classList.add(cl));
  }

  private _removePreviousFontClasses() {
    if (!this._previousFontClasses) {
      return;
    }
    this._previousFontClasses.forEach((cl) => {
      // IE11 doesn't support multiple paramaters in remove or add
      // so we can't use the spread operator here
      this.el.nativeElement.classList.remove(cl);
    });
  }
}
