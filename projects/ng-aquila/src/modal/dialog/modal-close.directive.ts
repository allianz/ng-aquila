import { Directive, ElementRef, input, OnInit, Optional } from '@angular/core';

import { NxDialogService } from './dialog.service';
import { NxModalRef } from './modal-ref';

/**
 * Button that will close the current modal.
 */
@Directive({
  selector: '[nxModalClose]',
  host: {
    '(click)': 'modalRef?.close(modalResult())',
    '[attr.aria-label]': 'ariaLabel() || null',
    '[attr.type]': 'type()',
  },
  standalone: true,
})
export class NxModalCloseDirective implements OnInit {
  /** Screenreader label for the button. */
  readonly ariaLabel = input<string>('', { alias: 'aria-label' });

  /** Defaults to `'button'` to prevents accidental form submits. */
  readonly type = input<'submit' | 'button' | 'reset'>('button');

  /** Dialog close input. */
  readonly modalResult = input<any>(undefined, { alias: 'nxModalClose' });

  constructor(
    @Optional() public modalRef: NxModalRef<any> | null,
    private readonly _elementRef: ElementRef<HTMLElement>,
    private readonly _dialogService: NxDialogService,
  ) {}

  ngOnInit(): void {
    if (!this.modalRef) {
      // When this directive is included in a modal via TemplateRef (rather than being
      // in a Component), the DialogRef isn't available via injection because embedded
      // views cannot be given a custom injector. Instead, we look up the DialogRef by
      // ID. This must occur in `onInit`, as the ID binding for the modal container won't
      // be resolved at constructor time.
      this.modalRef = getClosestDialog(this._elementRef, this._dialogService.openModals)!;
    }
  }
}

/**
 * Finds the closest NxModalRef to an element by looking at the DOM.
 * @param element Element relative to which to look for a modal.
 * @param openDialogs References to the currently-open modals.
 */
function getClosestDialog(element: ElementRef<HTMLElement>, openDialogs: NxModalRef<any>[]) {
  let parent: HTMLElement | null = element.nativeElement.parentElement;

  while (parent && !parent.classList.contains('nx-modal__container')) {
    parent = parent.parentElement;
  }

  return parent ? openDialogs.find((modal) => modal.id === parent!.id) : null;
}
