import { Overlay, ScrollStrategy } from '@angular/cdk/overlay';
import { FactoryProvider, InjectionToken } from '@angular/core';
import { NX_AUTOCOMPLETE_SCROLL_STRATEGY } from '@aposin/ng-aquila/autocomplete';
import { NX_CONTEXT_MENU_SCROLL_STRATEGY } from '@aposin/ng-aquila/context-menu';
import { NX_DATEPICKER_SCROLL_STRATEGY } from '@aposin/ng-aquila/datefield';
import { NX_DROPDOWN_SCROLL_STRATEGY } from '@aposin/ng-aquila/dropdown';
import { NX_MODAL_SCROLL_STRATEGY } from '@aposin/ng-aquila/modal';
import { NX_NOTIFICATION_PANEL_SCROLL_STRATEGY } from '@aposin/ng-aquila/notification-panel';
import { NX_OVERLAY_SCROLL_STRATEGY } from '@aposin/ng-aquila/overlay';
import { NX_POPOVER_SCROLL_STRATEGY } from '@aposin/ng-aquila/popover';
import { NX_TOOLTIP_SCROLL_STRATEGY } from '@aposin/ng-aquila/tooltip';

import { NxScrollStrategy, NxScrollStrategyDefaultConfig, NxScrollStrategyFactoryConfig, NxScrollStrategyOptions } from './nx-scroll-strategy.models';

/** Return an appropriate scroll strategy factory from the `Overlay` service. */
export function getScrollStrategyFactory(preset: NxScrollStrategy, overlay: Overlay, options?: NxScrollStrategyOptions): () => ScrollStrategy {
    switch (preset) {
        case 'reposition':
            return () => overlay.scrollStrategies.reposition({ autoClose: options?.autoClose, scrollThrottle: options?.scrollThrottle });
        case 'close':
            return () => overlay.scrollStrategies.close({ threshold: options?.threshold });
        case 'block':
            return overlay.scrollStrategies.block;
        case 'noop':
            return overlay.scrollStrategies.noop;
        default:
            return overlay.scrollStrategies.reposition;
    }
}

/** Return an array of scroll strategy providers based on the provided default config. */
export function getScrollStrategyDefaultProviders(config: NxScrollStrategyDefaultConfig): FactoryProvider[] {
    return [
        { provide: NX_AUTOCOMPLETE_SCROLL_STRATEGY, useFactory: getFactoryFnByDefaultConfig(config, 'autocomplete'), deps: [Overlay] },
        { provide: NX_CONTEXT_MENU_SCROLL_STRATEGY, useFactory: getFactoryFnByDefaultConfig(config, 'contextMenu'), deps: [Overlay] },
        { provide: NX_DATEPICKER_SCROLL_STRATEGY, useFactory: getFactoryFnByDefaultConfig(config, 'datepicker'), deps: [Overlay] },
        { provide: NX_DROPDOWN_SCROLL_STRATEGY, useFactory: getFactoryFnByDefaultConfig(config, 'dropdown'), deps: [Overlay] },
        { provide: NX_NOTIFICATION_PANEL_SCROLL_STRATEGY, useFactory: getFactoryFnByDefaultConfig(config, 'notificationPanel'), deps: [Overlay] },
        ...getExtraProvidersByDefaultConfig(config),
    ];
}

function getFactoryFnByDefaultConfig(
    config: NxScrollStrategyDefaultConfig,
    // eslint-disable-next-line @typescript-eslint/consistent-indexed-object-style
    componentName: keyof (NxScrollStrategyDefaultConfig['overrides'] & Record<never, never>), // workaround: index signature not working
): (overlay: Overlay) => () => ScrollStrategy {
    const componentConfig = config.overrides?.[componentName] ?? config;
    return (overlay: Overlay) => getScrollStrategyFactory(componentConfig.scrollStrategy, overlay, componentConfig.scrollStrategyOptions);
}

function getExtraProvidersByDefaultConfig(config: NxScrollStrategyDefaultConfig): FactoryProvider[] {
    return Object.entries(config.extraComponents ?? {}).map(([componentName, { scrollStrategy, scrollStrategyOptions }]) => ({
        provide: getInjectionToken(componentName),
        useFactory: (overlay: Overlay) => getScrollStrategyFactory(scrollStrategy, overlay, scrollStrategyOptions),
        deps: [Overlay],
    }));
}

/** Return an array of scroll strategy providers based on the provided factory config. */
export function getScrollStrategyFactoryProviders(config: NxScrollStrategyFactoryConfig): FactoryProvider[] {
    return [
        { provide: NX_AUTOCOMPLETE_SCROLL_STRATEGY, useFactory: getFactoryFnByFactoryConfig(config, 'autocomplete'), deps: [Overlay] },
        { provide: NX_CONTEXT_MENU_SCROLL_STRATEGY, useFactory: getFactoryFnByFactoryConfig(config, 'contextMenu'), deps: [Overlay] },
        { provide: NX_DATEPICKER_SCROLL_STRATEGY, useFactory: getFactoryFnByFactoryConfig(config, 'datepicker'), deps: [Overlay] },
        { provide: NX_DROPDOWN_SCROLL_STRATEGY, useFactory: getFactoryFnByFactoryConfig(config, 'dropdown'), deps: [Overlay] },
        { provide: NX_NOTIFICATION_PANEL_SCROLL_STRATEGY, useFactory: getFactoryFnByFactoryConfig(config, 'notificationPanel'), deps: [Overlay] },
        ...getExtraProvidersByFactoryConfig(config),
    ];
}

function getFactoryFnByFactoryConfig(
    config: NxScrollStrategyFactoryConfig,
    // eslint-disable-next-line @typescript-eslint/consistent-indexed-object-style
    componentName: keyof (NxScrollStrategyDefaultConfig['overrides'] & Record<never, never>), // workaround: index signature not working
): (overlay: Overlay) => () => ScrollStrategy {
    return config.overrides?.[componentName]?.scrollStrategyFactory ?? config.scrollStrategyFactory;
}

function getExtraProvidersByFactoryConfig(config: NxScrollStrategyFactoryConfig): FactoryProvider[] {
    return Object.entries(config.extraComponents ?? {}).map(([componentName, { scrollStrategyFactory }]) => ({
        provide: getInjectionToken(componentName),
        useFactory: scrollStrategyFactory,
        deps: [Overlay],
    }));
}

function getInjectionToken(componentName: string): InjectionToken<() => ScrollStrategy> {
    switch (componentName) {
        case 'dialog':
            return NX_MODAL_SCROLL_STRATEGY;
        case 'overlay':
            return NX_OVERLAY_SCROLL_STRATEGY;
        case 'popover':
            return NX_POPOVER_SCROLL_STRATEGY;
        case 'tooltip':
            return NX_TOOLTIP_SCROLL_STRATEGY;
        default:
            throw new Error(`Injection token for ${componentName} scroll strategy not recognized.`);
    }
}
