import { NxDropdownModule } from '@allianz/ng-aquila/dropdown';
import { NxFormfieldModule } from '@allianz/ng-aquila/formfield';
import { NxDialogService, NxModalComponent, NxModalModule } from '@allianz/ng-aquila/modal';
import { OverlayContainer } from '@angular/cdk/overlay';
import { ChangeDetectionStrategy, Component, ViewChild, ViewContainerRef } from '@angular/core';
import { type ComponentFixture, fakeAsync, flush, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { NxSurface } from './surface';
import { SurfaceProbeComponent } from './surface.test-utils';

// Overlays render on a background of their own, but injection still reaches them through the
// trigger's injector, so each one resets the surface at its boundary. These specs pin that down on
// the real components: the panel content must resolve `default` even though the trigger sits on an
// `attention` surface. Every host also probes next to the trigger, so a spec cannot pass by
// failing to publish a surface in the first place.

describe('nxSurface in overlays', () => {
  let fixture: ComponentFixture<any>;
  let overlayContainer: OverlayContainer;

  function triggerProbe(): SurfaceProbeComponent {
    return fixture.debugElement.query(By.directive(SurfaceProbeComponent))
      .componentInstance as SurfaceProbeComponent;
  }

  function overlayProbeSurface(): string | null {
    const probe = overlayContainer.getContainerElement().querySelector('nx-surface-probe');
    return probe!.getAttribute('data-resolved-surface');
  }

  afterEach(() => {
    overlayContainer.ngOnDestroy();
  });

  describe('a modal opened by NxDialogService', () => {
    let dialog: NxDialogService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [NxModalModule, DialogHostComponent, DialogContentComponent],
      });
      dialog = TestBed.inject(NxDialogService);
      overlayContainer = TestBed.inject(OverlayContainer);
      fixture = TestBed.createComponent(DialogHostComponent);
      fixture.detectChanges();
    });

    // Regression guard for the provider's placement: it has to sit in the content injector built
    // by NxDialogService, not on NxModalContainer. The container and the content are injector
    // siblings, so a provider on the container would never be seen by the content, and the modal
    // body would render inverted on a white overlay.
    it('resets the surface for its content', () => {
      expect(triggerProbe().surface()).toBe('attention');

      dialog.open(DialogContentComponent, {
        viewContainerRef: fixture.componentInstance.viewContainer,
      });
      fixture.detectChanges();

      expect(overlayProbeSurface()).toBe('default');
    });
  });

  describe('an inline nx-modal', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [NxModalModule.forRoot(), InlineModalHostComponent],
      });
      overlayContainer = TestBed.inject(OverlayContainer);
      fixture = TestBed.createComponent(InlineModalHostComponent);
      fixture.detectChanges();
    });

    // The inline modal floats above the page rather than rendering in the overlay container, so
    // its content is queried from the fixture instead.
    it('resets the surface for its projected content', () => {
      expect(triggerProbe().surface()).toBe('attention');

      fixture.componentInstance.open = true;
      fixture.detectChanges();

      const inModal = fixture.nativeElement.querySelector('nx-modal nx-surface-probe') as Element;
      expect(inModal.getAttribute('data-resolved-surface')).toBe('default');
    });
  });

  describe('a dropdown panel', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [NxDropdownModule, NxFormfieldModule, DropdownHostComponent],
      });
      overlayContainer = TestBed.inject(OverlayContainer);
      fixture = TestBed.createComponent(DropdownHostComponent);
      fixture.detectChanges();
    });

    // Stands in for the six overlays that reset through a decorator `providers` entry
    // (autocomplete, context-menu, dropdown, notification-panel, popover, tooltip).
    it('resets the surface for its items', fakeAsync(() => {
      expect(triggerProbe().surface()).toBe('attention');

      (fixture.nativeElement.querySelector('.nx-dropdown__container') as HTMLElement).click();
      fixture.detectChanges();
      flush();

      expect(overlayProbeSurface()).toBe('default');
    }));
  });
});

@Component({
  selector: 'nx-dialog-content',
  standalone: true,
  template: '<nx-surface-probe />',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SurfaceProbeComponent],
})
class DialogContentComponent {}

@Component({
  template: `
    <div nxSurface="attention">
      <nx-surface-probe />
      <ng-container #viewContainer />
    </div>
  `,
  standalone: true,
  imports: [NxSurface, SurfaceProbeComponent],
})
class DialogHostComponent {
  @ViewChild('viewContainer', { read: ViewContainerRef, static: true })
  viewContainer!: ViewContainerRef;
}

@Component({
  template: `
    <div nxSurface="attention">
      <nx-surface-probe />
      @if (open) {
        <nx-modal><nx-surface-probe /></nx-modal>
      }
    </div>
  `,
  standalone: true,
  // Mutating `open` and calling detectChanges() needs an eagerly checked host.
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NxSurface, NxModalComponent, SurfaceProbeComponent],
})
class InlineModalHostComponent {
  open = false;
}

@Component({
  template: `
    <div nxSurface="attention">
      <nx-surface-probe />
      <nx-formfield label="Choose">
        <nx-dropdown>
          <nx-dropdown-item value="a"><nx-surface-probe /></nx-dropdown-item>
        </nx-dropdown>
      </nx-formfield>
    </div>
  `,
  standalone: true,
  imports: [NxSurface, NxDropdownModule, NxFormfieldModule, SurfaceProbeComponent],
})
class DropdownHostComponent {}
