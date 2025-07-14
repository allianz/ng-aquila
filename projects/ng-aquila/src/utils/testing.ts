import { OverlayRef, ScrollStrategy } from '@angular/cdk/overlay';

/**
 * Helper ScrollStrategy to be used in tests to test overriding the default scroll strategy.
 *
 * Example usage:
 * TestBed.resetTestingModule()
 * .configureTestingModule({
 * imports: [ScrollStrategyOverrideComponent, NxAutocompleteModule, NxInputModule, NoopAnimationsModule],
 * providers: [
 * {
 *  provide: NX_AUTOCOMPLETE_SCROLL_STRATEGY,
 *  useFactory: () => fakeScrollStrategyFunction,
 * },
 * ],
 * })
 * .compileComponents();
 * createTestComponent(ScrollStrategyOverrideComponent);
 * expect((testInstance as ScrollStrategyOverrideComponent).scrollStrategy).toBe(fakeScrollStrategyFunction);
 *
 */
export class FakeScrollStrategy implements ScrollStrategy {
  isEnabled = false;
  overlayRef!: OverlayRef;

  attach(overlayRef: OverlayRef) {
    this.overlayRef = overlayRef;
  }

  enable() {
    this.isEnabled = true;
  }

  disable() {
    this.isEnabled = false;
  }

  detach() {
    this.overlayRef = null!;
  }
}

/** See usage at FakeScrollStrategy */
export const fakeScrollStrategyFunction = () => new FakeScrollStrategy();
