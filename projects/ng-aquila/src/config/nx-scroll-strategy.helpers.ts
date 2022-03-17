import { Overlay, ScrollStrategy } from '@angular/cdk/overlay';
import { FactoryProvider } from '@angular/core';
import { NX_AUTOCOMPLETE_SCROLL_STRATEGY } from '@aposin/ng-aquila/autocomplete';
import { NX_CONTEXT_MENU_SCROLL_STRATEGY } from '@aposin/ng-aquila/context-menu';
import { NX_DATEPICKER_SCROLL_STRATEGY } from '@aposin/ng-aquila/datefield';
import { NX_DROPDOWN_SCROLL_STRATEGY } from '@aposin/ng-aquila/dropdown';
import { NX_NOTIFICATION_PANEL_SCROLL_STRATEGY } from '@aposin/ng-aquila/notification-panel';

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
    ];
}

function getFactoryFnByDefaultConfig(
    config: NxScrollStrategyDefaultConfig,
    componentName: keyof (NxScrollStrategyDefaultConfig['overrides'] & Record<never, never>),
): (overlay: Overlay) => () => ScrollStrategy {
    const componentConfig = config.overrides?.[componentName] ?? config;
    return (overlay: Overlay) => getScrollStrategyFactory(componentConfig.scrollStrategy, overlay, componentConfig.scrollStrategyOptions);
}

/** Return an array of scroll strategy providers based on the provided factory config. */
export function getScrollStrategyFactoryProviders(config: NxScrollStrategyFactoryConfig): FactoryProvider[] {
    return [
        { provide: NX_AUTOCOMPLETE_SCROLL_STRATEGY, useFactory: getFactoryFnByFactoryConfig(config, 'autocomplete'), deps: [Overlay] },
        { provide: NX_CONTEXT_MENU_SCROLL_STRATEGY, useFactory: getFactoryFnByFactoryConfig(config, 'contextMenu'), deps: [Overlay] },
        { provide: NX_DATEPICKER_SCROLL_STRATEGY, useFactory: getFactoryFnByFactoryConfig(config, 'datepicker'), deps: [Overlay] },
        { provide: NX_DROPDOWN_SCROLL_STRATEGY, useFactory: getFactoryFnByFactoryConfig(config, 'dropdown'), deps: [Overlay] },
        { provide: NX_NOTIFICATION_PANEL_SCROLL_STRATEGY, useFactory: getFactoryFnByFactoryConfig(config, 'notificationPanel'), deps: [Overlay] },
    ];
}

function getFactoryFnByFactoryConfig(
    config: NxScrollStrategyFactoryConfig,
    componentName: keyof (NxScrollStrategyDefaultConfig['overrides'] & Record<never, never>),
): (overlay: Overlay) => () => ScrollStrategy {
    return (config.overrides?.[componentName] ?? config).scrollStrategyFactory;
}
