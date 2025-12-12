import { NxButtonComponent } from '@allianz/ng-aquila/button';
import { NxCopytextComponent } from '@allianz/ng-aquila/copytext';
import { NxHeadlineComponent } from '@allianz/ng-aquila/headline';
import { NxDialogService } from '@allianz/ng-aquila/modal';
import { Overlay, OverlayContainer } from '@angular/cdk/overlay';
import {
  Component,
  ElementRef,
  inject,
  Injectable,
  type OnInit,
  type TemplateRef,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';

/**
 * Custom OverlayContainer that renders overlays inside Shadow DOM
 */
@Injectable()
class ShadowDomOverlayContainer extends OverlayContainer {
  private shadowRoot: ShadowRoot | null = null;

  setShadowRoot(shadowRoot: ShadowRoot): void {
    this.shadowRoot = shadowRoot;
  }

  protected override _createContainer(): void {
    const container = this._document.createElement('div');
    container.classList.add('cdk-overlay-container');
    // Use the shadow root if available, otherwise fall back to body
    const parent = this.shadowRoot || this._document.body;
    parent.appendChild(container);
    this._containerElement = container;
  }
}

/**
 * @title Modal with ShadowDOM encapsulation
 */
@Component({
  selector: 'web-components-modal-shadow-dom-example',
  templateUrl: './web-components-modal-shadow-dom-example.html',
  styleUrls: ['./web-components-modal-shadow-dom-example.css'],
  encapsulation: ViewEncapsulation.ShadowDom,
  imports: [NxButtonComponent, NxHeadlineComponent, NxCopytextComponent],
  providers: [
    { provide: OverlayContainer, useClass: ShadowDomOverlayContainer },
    Overlay, // Provide Overlay at component level so it uses the component's OverlayContainer
    NxDialogService, // Provide at component level to use the component's OverlayContainer and Overlay
  ],
})
export class WebComponentsModalShadowDomExampleComponent implements OnInit {
  @ViewChild('modalTemplate') modalTemplate!: TemplateRef<unknown>;

  private readonly elementRef = inject(ElementRef);
  private readonly overlayContainer = inject(
    OverlayContainer,
  ) as ShadowDomOverlayContainer;
  private readonly dialogService = inject(NxDialogService);

  ngOnInit(): void {
    // Get the shadow root from the host element and set it on the overlay container
    // The host element IS the shadow host, so we access its shadowRoot property
    const shadowRoot = this.elementRef.nativeElement.shadowRoot;

    if (shadowRoot instanceof ShadowRoot) {
      this.overlayContainer.setShadowRoot(shadowRoot);
    }
  }

  openModal(): void {
    this.dialogService.open(this.modalTemplate, {
      ariaLabel: 'ShadowDOM Modal Example',
      showCloseIcon: true,
    });
  }
}
