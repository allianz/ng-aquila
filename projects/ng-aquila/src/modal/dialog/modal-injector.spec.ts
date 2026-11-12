import {
  NX_MODAL_DATA,
  NX_MODAL_DEFAULT_OPTIONS,
  NxDialogService,
  NxModalModule,
  NxModalRef,
} from '@allianz/ng-aquila/modal';
import { NX_SURFACE } from '@allianz/ng-aquila/surface';
import { OverlayContainer } from '@angular/cdk/overlay';
import {
  ChangeDetectionStrategy,
  Component,
  Directive,
  Injectable,
  getDebugNode,
  inject,
  InjectionToken,
  Injector,
  input,
  inputBinding,
  model,
  OnInit,
  output,
  outputBinding,
  signal,
  TemplateRef,
  twoWayBinding,
  viewChild,
  ViewContainerRef,
} from '@angular/core';
import { ComponentFixture, fakeAsync, flush, TestBed } from '@angular/core/testing';

import { NxModalContainer } from './modal-container.component';

const TEST_TOKEN = new InjectionToken<string>('TEST_TOKEN');
const OTHER_TOKEN = new InjectionToken<string>('OTHER_TOKEN');

@Injectable({ providedIn: 'root' })
class RootService {
  readonly name = 'root service';
}

describe('NxDialog injector, providers, bindings and componentRef', () => {
  let dialog: NxDialogService;
  let overlayContainer: OverlayContainer;
  let overlayContainerElement: HTMLElement;
  let hostFixture: ComponentFixture<HostWithViewContainer>;
  let hostViewContainerRef: ViewContainerRef;

  function setup(providers: any[] = []) {
    TestBed.configureTestingModule({ imports: [NxModalModule], providers });
    dialog = TestBed.inject(NxDialogService);
    overlayContainer = TestBed.inject(OverlayContainer);
    overlayContainerElement = overlayContainer.getContainerElement();
    hostFixture = TestBed.createComponent(HostWithViewContainer);
    hostFixture.detectChanges();
    hostViewContainerRef = hostFixture.componentInstance.child().viewContainerRef;
  }

  afterEach(() => {
    overlayContainer.ngOnDestroy();
  });

  function customInjector(value: string) {
    return Injector.create({
      parent: TestBed.inject(Injector),
      providers: [{ provide: TEST_TOKEN, useValue: value }],
    });
  }

  describe('injector', () => {
    beforeEach(() => setup());

    it('should resolve a token that only exists in the passed injector', () => {
      const modalRef = dialog.open(TokenReader, { injector: customInjector('from injector') });
      hostFixture.detectChanges();

      expect(modalRef.componentInstance.token).toBe('from injector');
    });

    it('should prefer the injector over the viewContainerRef injector for DI', () => {
      const modalRef = dialog.open(TokenReader, {
        injector: customInjector('from injector'),
        viewContainerRef: hostViewContainerRef,
      });
      hostFixture.detectChanges();

      expect(modalRef.componentInstance.token).toBe('from injector');
      expect(modalRef.componentInstance.host).toBeNull();
    });

    it('should still render and run change detection through the viewContainerRef', () => {
      const modalRef = dialog.open(LabelContent, {
        injector: customInjector('from injector'),
        viewContainerRef: hostViewContainerRef,
      });
      hostFixture.detectChanges();
      expect(overlayContainerElement.textContent).toContain('label initial');

      modalRef.componentRef!.setInput('label', 'changed');
      hostFixture.detectChanges();
      expect(overlayContainerElement.textContent).toContain('label changed');
    });

    it('should attach the content to the viewContainerRef when an injector is passed', () => {
      const modalRef = dialog.open(LabelContent, {
        injector: customInjector('from injector'),
        viewContainerRef: hostViewContainerRef,
      });

      expect(hostViewContainerRef.indexOf(modalRef.componentRef!.hostView)).not.toBe(-1);
    });

    it('should use the injector as the parent of the modal container', () => {
      dialog.open(TokenReader, { injector: customInjector('from injector') });
      hostFixture.detectChanges();

      const containerElement = overlayContainerElement.querySelector('nx-modal-container')!;
      expect(getDebugNode(containerElement)!.injector.get(TEST_TOKEN)).toBe('from injector');
    });

    it('should be the parent injector of a template modal', () => {
      const templateFixture = TestBed.createComponent(HostWithTemplate);
      templateFixture.detectChanges();

      dialog.open(templateFixture.componentInstance.tokenTemplate(), {
        injector: customInjector('from injector'),
      });
      templateFixture.detectChanges();

      expect(overlayContainerElement.textContent).toContain('template token from injector');
    });

    it('should keep the internal providers on top of the passed injector', () => {
      const modalRef = dialog.open(TokenReader, {
        injector: Injector.create({
          parent: TestBed.inject(Injector),
          providers: [
            { provide: NX_MODAL_DATA, useValue: 'outer data' },
            { provide: NX_SURFACE, useValue: { surface: 'outer' } },
          ],
        }),
        data: 'modal data',
      });
      hostFixture.detectChanges();

      const content = modalRef.componentInstance;
      expect(content.modalRef).toBe(modalRef);
      expect(content.data).toBe('modal data');
      expect(content.container).toBeInstanceOf(NxModalContainer);
      expect(content.surface).toBeUndefined();
    });
  });

  describe('providers', () => {
    beforeEach(() => setup());

    it('should add providers from an array', () => {
      const modalRef = dialog.open(TokenReader, {
        providers: [{ provide: TEST_TOKEN, useValue: 'from providers' }],
      });
      hostFixture.detectChanges();

      expect(modalRef.componentInstance.token).toBe('from providers');
    });

    it('should add providers from a factory that receives the modal ref, config and container', () => {
      const factory = vi.fn(() => [{ provide: TEST_TOKEN, useValue: 'from factory' }]);
      const modalRef = dialog.open(TokenReader, { providers: factory, data: 'modal data' });
      hostFixture.detectChanges();

      expect(modalRef.componentInstance.token).toBe('from factory');
      const [ref, config, container] = factory.mock.calls[0] as unknown as [any, any, any];
      expect(ref).toBe(modalRef);
      expect(config.data).toBe('modal data');
      expect(container).toBeInstanceOf(NxModalContainer);
    });

    it('should destroy providers when the modal is closed', fakeAsync(() => {
      const SERVICE = new InjectionToken<{ ngOnDestroy: () => void }>('SERVICE');
      const ngOnDestroy = vi.fn();
      const modalRef = dialog.open(TokenReader, {
        providers: [{ provide: SERVICE, useFactory: () => ({ ngOnDestroy }) }],
      });
      hostFixture.detectChanges();
      modalRef.componentRef!.injector.get(SERVICE);

      modalRef.close();
      hostFixture.detectChanges();
      flush();

      expect(modalRef.componentRef).toBeNull();
      expect(ngOnDestroy).toHaveBeenCalled();
    }));

    it('should let providers override the internal tokens', () => {
      const fakeModalRef = {};
      const modalRef = dialog.open(TokenReader, {
        data: 'modal data',
        providers: [
          { provide: NX_MODAL_DATA, useValue: 'overridden' },
          { provide: NxModalRef, useValue: fakeModalRef },
          { provide: NX_SURFACE, useValue: { surface: 'custom' } },
        ],
      });
      hostFixture.detectChanges();

      expect(modalRef.componentInstance.data).toBe('overridden');
      expect(modalRef.componentInstance.modalRef).toBe(fakeModalRef);
      expect(modalRef.componentInstance.surface).toEqual({ surface: 'custom' });
    });

    it('should add providers to a template modal', () => {
      const templateFixture = TestBed.createComponent(HostWithTemplate);
      templateFixture.detectChanges();

      dialog.open(templateFixture.componentInstance.tokenTemplate(), {
        providers: [{ provide: TEST_TOKEN, useValue: 'from providers' }],
      });
      templateFixture.detectChanges();

      expect(overlayContainerElement.textContent).toContain('template token from providers');
    });

    it('should resolve from the template declaration before the root injector', () => {
      TestBed.resetTestingModule();
      setup([{ provide: TEST_TOKEN, useValue: 'from root' }]);
      const templateFixture = TestBed.createComponent(HostWithTemplate);
      templateFixture.detectChanges();

      dialog.open(templateFixture.componentInstance.tokenTemplate());
      templateFixture.detectChanges();

      expect(overlayContainerElement.textContent).toContain('template token from template host');
    });

    it('should resolve the dependencies of template modal providers through the injector', () => {
      const templateFixture = TestBed.createComponent(HostWithTemplate);
      templateFixture.detectChanges();

      dialog.open(templateFixture.componentInstance.tokenTemplate(), {
        injector: TestBed.inject(Injector),
        providers: [
          {
            provide: TEST_TOKEN,
            useFactory: (service: RootService) => `from providers using ${service.name}`,
            deps: [RootService],
          },
        ],
      });
      templateFixture.detectChanges();

      expect(overlayContainerElement.textContent).toContain(
        'template token from providers using root service',
      );
    });

    it('should not resolve the dependencies of template modal providers without an injector', () => {
      const templateFixture = TestBed.createComponent(HostWithTemplate);
      templateFixture.detectChanges();

      expect(() =>
        dialog.open(templateFixture.componentInstance.tokenTemplate(), {
          providers: [
            {
              provide: TEST_TOKEN,
              useFactory: (service: RootService) => service.name,
              deps: [RootService],
            },
          ],
        }),
      ).toThrow(/RootService/);
    });

    it('should resolve from the template declaration before root when providers are passed', () => {
      TestBed.resetTestingModule();
      setup([{ provide: TEST_TOKEN, useValue: 'from root' }]);
      const templateFixture = TestBed.createComponent(HostWithTemplate);
      templateFixture.detectChanges();

      dialog.open(templateFixture.componentInstance.tokenTemplate(), {
        providers: [{ provide: OTHER_TOKEN, useValue: 'unrelated' }],
      });
      templateFixture.detectChanges();

      expect(overlayContainerElement.textContent).toContain('template token from template host');
    });
  });

  describe('componentRef', () => {
    beforeEach(() => setup());

    it('should expose the componentRef of a component modal', () => {
      const modalRef = dialog.open(TokenReader);
      hostFixture.detectChanges();

      expect(modalRef.componentRef).not.toBeNull();
      expect(modalRef.componentRef!.instance).toBe(modalRef.componentInstance);
    });

    it('should be null for a template modal', () => {
      const templateFixture = TestBed.createComponent(HostWithTemplate);
      templateFixture.detectChanges();

      const modalRef = dialog.open(templateFixture.componentInstance.template());
      templateFixture.detectChanges();

      expect(modalRef.componentRef).toBeNull();
    });

    it('should update a signal input via setInput', () => {
      const modalRef = dialog.open(LabelContent);
      hostFixture.detectChanges();

      modalRef.componentRef!.setInput('label', 'changed');
      modalRef.componentRef!.changeDetectorRef.detectChanges();

      expect(overlayContainerElement.textContent).toContain('label changed');
    });

    it('should set a required signal input via setInput right after open', () => {
      const modalRef = dialog.open(SignalInputContent);
      modalRef.componentRef!.setInput('userId', 'a');
      hostFixture.detectChanges();

      expect(modalRef.componentInstance.userIdOnInit).toBe('a');
      expect(overlayContainerElement.textContent).toContain('user a');
    });

    it('should be cleared after the modal is closed', fakeAsync(() => {
      const modalRef = dialog.open(TokenReader);
      hostFixture.detectChanges();

      modalRef.close();
      hostFixture.detectChanges();
      flush();

      expect(modalRef.componentRef).toBeNull();
    }));
  });

  describe('bindings', () => {
    beforeEach(() => setup());

    it('should set a required signal input before ngOnInit', () => {
      const modalRef = dialog.open(SignalInputContent, {
        bindings: [inputBinding('userId', () => 'a')],
      });
      hostFixture.detectChanges();

      expect(modalRef.componentInstance.userIdOnInit).toBe('a');
      expect(overlayContainerElement.textContent).toContain('user a');
    });

    it('should call the output binding', () => {
      const saved = vi.fn();
      const modalRef = dialog.open(SignalInputContent, {
        bindings: [inputBinding('userId', () => 'a'), outputBinding('saved', saved)],
      });
      hostFixture.detectChanges();

      modalRef.componentInstance.saved.emit('done');

      expect(saved).toHaveBeenCalledWith('done');
    });

    it('should sync a two-way binding both ways', () => {
      const value = signal(1);
      const modalRef = dialog.open(SignalInputContent, {
        bindings: [inputBinding('userId', () => 'a'), twoWayBinding('value', value)],
      });
      const changeDetectorRef = modalRef.componentRef!.changeDetectorRef;
      changeDetectorRef.detectChanges();
      expect(modalRef.componentInstance.value()).toBe(1);

      value.set(2);
      changeDetectorRef.detectChanges();
      expect(modalRef.componentInstance.value()).toBe(2);

      modalRef.componentInstance.value.set(3);
      expect(value()).toBe(3);
    });

    it('should ignore bindings for a template modal', () => {
      const templateFixture = TestBed.createComponent(HostWithTemplate);
      templateFixture.detectChanges();

      expect(() => {
        dialog.open(templateFixture.componentInstance.template(), {
          bindings: [inputBinding('userId', () => 'a')],
        });
        templateFixture.detectChanges();
      }).not.toThrow();
      expect(overlayContainerElement.textContent).toContain('template content');
    });
  });

  describe('NX_MODAL_DEFAULT_OPTIONS', () => {
    it('should ignore injector, providers and bindings from the default options', () => {
      setup([
        {
          provide: NX_MODAL_DEFAULT_OPTIONS,
          useFactory: () => ({
            injector: customInjector('from default injector'),
            providers: [{ provide: TEST_TOKEN, useValue: 'from default providers' }],
            bindings: [inputBinding('userId', () => 'from defaults')],
            width: '200px',
          }),
        },
      ]);

      const modalRef = dialog.open(TokenReader);
      hostFixture.detectChanges();

      expect(modalRef.componentInstance.token).toBeNull();
      expect(modalRef.componentInstance.container._config.width).toBe('200px');
    });
  });
});

@Directive({
  selector: 'test-view-container-host',
  providers: [{ provide: TEST_TOKEN, useValue: 'from view container' }],
})
class ViewContainerHost {
  readonly viewContainerRef = inject(ViewContainerRef);
}

@Component({
  selector: 'test-host-with-view-container',
  template: '<test-view-container-host />',
  imports: [ViewContainerHost],
  changeDetection: ChangeDetectionStrategy.Eager,
})
class HostWithViewContainer {
  readonly child = viewChild.required(ViewContainerHost);
}

@Directive({ selector: 'test-template-token-reader', host: { '[textContent]': '_text' } })
class TemplateTokenReader {
  protected readonly _text = `template token ${inject(TEST_TOKEN, { optional: true })}`;
}

@Component({
  selector: 'test-host-with-template',
  template: `
    <ng-template #plain>template content</ng-template>
    <ng-template #token><test-template-token-reader /></ng-template>
  `,
  imports: [TemplateTokenReader],
  providers: [{ provide: TEST_TOKEN, useValue: 'from template host' }],
  changeDetection: ChangeDetectionStrategy.Eager,
})
class HostWithTemplate {
  readonly template = viewChild.required<TemplateRef<unknown>>('plain');
  readonly tokenTemplate = viewChild.required<TemplateRef<unknown>>('token');
}

@Component({
  selector: 'test-token-reader',
  template: 'token reader',
  changeDetection: ChangeDetectionStrategy.Eager,
})
class TokenReader {
  readonly token = inject(TEST_TOKEN, { optional: true });
  readonly host = inject(ViewContainerHost, { optional: true });
  readonly modalRef = inject(NxModalRef);
  readonly data = inject(NX_MODAL_DATA);
  readonly container = inject(NxModalContainer);
  readonly surface = inject(NX_SURFACE, { optional: true });
}

@Component({
  selector: 'test-signal-input-content',
  template: 'user {{ userId() }} value {{ value() }}',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class SignalInputContent implements OnInit {
  readonly userId = input.required<string>();
  readonly value = model(0);
  readonly saved = output<string>();
  userIdOnInit?: string;

  ngOnInit() {
    this.userIdOnInit = this.userId();
  }
}

@Component({
  selector: 'test-label-content',
  template: 'label {{ label() }}',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class LabelContent {
  readonly label = input('initial');
}
