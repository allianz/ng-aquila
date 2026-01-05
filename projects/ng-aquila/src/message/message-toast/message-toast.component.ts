import { IdGenerationService } from '@allianz/ng-aquila/utils';
import {
  BasePortalOutlet,
  CdkPortalOutlet,
  ComponentPortal,
  TemplatePortal,
} from '@angular/cdk/portal';
import {
  AnimationCallbackEvent,
  ChangeDetectorRef,
  Component,
  ComponentRef,
  ElementRef,
  EmbeddedViewRef,
  inject,
  NgZone,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { Subject } from 'rxjs';

import { NxMessageComponent } from '../message/message.component';
import {
  NxMessageToastConfig,
  NxMessageToastContext,
  NxMessageToastData,
} from './message-toast-config';

/**
 * Internal component that wraps user-provided message toast content.
 * @docs-private
 */
@Component({
  selector: 'nx-message-toast',
  templateUrl: './message-toast.component.html',
  styleUrls: ['./message-toast.component.scss'],
  host: {
    '[attr.role]': '_role',
    '[class.nx-message-toast--visible]': '_animationState === "visible"',
    '[class.nx-message-toast--hidden]': '_animationState === "hidden"',
    '(animate.enter)': 'onAnimateEnter($event)',
  },
  imports: [NxMessageComponent, CdkPortalOutlet],
})
export class NxMessageToastComponent extends BasePortalOutlet implements OnDestroy {
  /** Whether the component has been destroyed. */
  private _destroyed = false;

  /** The portal outlet inside of this container into which the message toast content will be loaded. */
  @ViewChild(CdkPortalOutlet, { static: true }) _portalOutlet!: CdkPortalOutlet;

  /** Subject for notifying that the message toast has exited from view. */
  readonly _onExit = new Subject<void>();

  /** Subject for notifying that the message toast has finished entering the view. */
  readonly _onEnter = new Subject<void>();

  /** The state of the message toast animations. */
  _animationState = 'void';

  /** ARIA role for the message toast container. */
  _role: 'alert' | 'status' | null = null;

  _context: NxMessageToastContext;

  private readonly _idGenerationService = inject(IdGenerationService);
  _messageToastId = this._idGenerationService.nextId('nx-message-toast');
  _messageId = this._idGenerationService.nextId('nx-message');

  constructor(
    private readonly _ngZone: NgZone,
    private readonly _cdr: ChangeDetectorRef,
    private readonly _elementRef: ElementRef<HTMLElement>,
    /** The message toast configuration. */
    public config: NxMessageToastConfig,
    /** Injected data into the notifciation. */
    readonly data?: NxMessageToastData,
  ) {
    super();

    // Context is guaranteed to be set by the service that creates this component
    this._context = this.config.context ?? 'info';
    this._setAriaLabels();
  }

  /** Attach a component portal as content to this message toast container. */
  attachComponentPortal<T>(portal: ComponentPortal<T>): ComponentRef<T> {
    this._assertNotAttached();
    return this._portalOutlet.attachComponentPortal(portal);
  }

  /** Attach a template portal as content to this message toast container. */
  attachTemplatePortal<C>(portal: TemplatePortal<C>): EmbeddedViewRef<C> {
    this._assertNotAttached();
    return this._portalOutlet.attachTemplatePortal(portal);
  }

  protected onAnimateEnter(event: AnimationCallbackEvent) {
    const onEnter = this._onEnter;

    // Note: we shouldn't use `this` inside the zone callback,
    // because it can cause a memory leak.
    this._ngZone.run(() => {
      onEnter.next();
      onEnter.complete();
    });
  }

  /** Begin animation of message toast entrance into view. */
  enter(): void {
    setTimeout(() => {
      const element = this._elementRef.nativeElement;
      const inertElement = element.querySelector(`#${this._messageId}`);
      const liveElement = element.querySelector(`#${this._messageToastId}`);
      if (inertElement && liveElement) {
        inertElement.removeAttribute('aria-hidden');
        liveElement.appendChild(inertElement);
      }
    }, 0);
    if (!this._destroyed) {
      this._animationState = 'visible';
      this._cdr.detectChanges();
      this._cdr.markForCheck();
    }
  }

  /** Begin animation of the message toast exiting from view. */
  exit() {
    // Note: this one transitions to `hidden`, rather than `void`, in order to handle the case
    // where multiple notifications are opened in quick succession (e.g. two consecutive calls to
    // `NxMessageToastService.open`).
    this._animationState = 'hidden';
    this._cdr.markForCheck();

    setTimeout(() => {
      this._completeExit();
    }, 300); // TODO: use actual animation time
  }

  /** Makes sure the exit callbacks have been invoked when the element is destroyed. */
  ngOnDestroy(): void {
    this._destroyed = true;
    this._completeExit();
  }

  /**
   * Removes the element in a microtask. Helps prevent errors where we end up
   * removing an element which is in the middle of an animation.
   */
  private _completeExit() {
    queueMicrotask(() => {
      this._onExit.next();
      this._onExit.complete();
    });
  }

  /** Asserts that no content is already attached to the container. */
  private _assertNotAttached() {
    if (this._portalOutlet.hasAttached()) {
      throw Error('Attempting to attach message toast content after content is already attached');
    }
  }

  _setAriaLabels() {
    // Based on the ARIA spec, `alert` and `status` roles have an
    // implicit `assertive` and `polite` politeness respectively.
    if (this.config.politeness === 'assertive' && !this.config.announcementMessage) {
      this._role = 'alert';
    } else if (this.config.politeness === 'off') {
      this._role = null;
    } else {
      this._role = 'status';
    }
  }
}
