import { Overlay, RepositionScrollStrategyConfig, ScrollStrategy } from '@angular/cdk/overlay';

// fix: non-exported code copied from https://github.com/angular/components/blob/main/src/cdk/overlay/scroll/close-scroll-strategy.ts
/**
 * Config options for the CloseScrollStrategy.
 */
export interface CloseScrollStrategyConfig {
    /** Amount of pixels the user has to scroll before the overlay is closed. */
    threshold?: number;
}

/** Scroll strategy default presets for overlay-based components. */
export type NxScrollStrategy = 'reposition' | 'block' | 'close' | 'noop';

/** Scroll strategy default preset options for overlay-based components. */
export type NxScrollStrategyOptions = RepositionScrollStrategyConfig & CloseScrollStrategyConfig;

/** Scroll strategy default configuration. */
export interface NxScrollStrategyDefaultConfig {
    /** Preset for strategy factory that will be used to handle scrolling while a panel is open. */
    scrollStrategy: NxScrollStrategy;
    /** Additional strategy preset options. */
    scrollStrategyOptions?: NxScrollStrategyOptions;
    /** Override default config for each component type separately. */
    overrides?: {
        autocomplete?: Pick<NxScrollStrategyDefaultConfig, 'scrollStrategy' | 'scrollStrategyOptions'>;
        contextMenu?: Pick<NxScrollStrategyDefaultConfig, 'scrollStrategy' | 'scrollStrategyOptions'>;
        datepicker?: Pick<NxScrollStrategyDefaultConfig, 'scrollStrategy' | 'scrollStrategyOptions'>;
        dropdown?: Pick<NxScrollStrategyDefaultConfig, 'scrollStrategy' | 'scrollStrategyOptions'>;
        notificationPanel?: Pick<NxScrollStrategyDefaultConfig, 'scrollStrategy' | 'scrollStrategyOptions'>;
    };
    /** Configure default behavior for additional overlay-based component types. */
    extraComponents?: {
        dialog?: Pick<NxScrollStrategyDefaultConfig, 'scrollStrategy' | 'scrollStrategyOptions'>;
        overlay?: Pick<NxScrollStrategyDefaultConfig, 'scrollStrategy' | 'scrollStrategyOptions'>;
        popover?: Pick<NxScrollStrategyDefaultConfig, 'scrollStrategy' | 'scrollStrategyOptions'>;
        tooltip?: Pick<NxScrollStrategyDefaultConfig, 'scrollStrategy' | 'scrollStrategyOptions'>;
    };
}

/** Scroll strategy factory creator function. */
export type NxScrollStrategyFactoryFn = (overlay: Overlay) => () => ScrollStrategy;

/** Scroll strategy factory configuration. */
export interface NxScrollStrategyFactoryConfig {
    /** Creator function for strategy factory that will be used to handle scrolling while a panel is open. */
    scrollStrategyFactory: NxScrollStrategyFactoryFn;
    /** Override default config for each component type separately. */
    overrides?: {
        autocomplete?: Pick<NxScrollStrategyFactoryConfig, 'scrollStrategyFactory'>;
        contextMenu?: Pick<NxScrollStrategyFactoryConfig, 'scrollStrategyFactory'>;
        datepicker?: Pick<NxScrollStrategyFactoryConfig, 'scrollStrategyFactory'>;
        dropdown?: Pick<NxScrollStrategyFactoryConfig, 'scrollStrategyFactory'>;
        notificationPanel?: Pick<NxScrollStrategyFactoryConfig, 'scrollStrategyFactory'>;
    };
    /** Configure default behavior for additional overlay-based component types. */
    extraComponents?: {
        dialog?: Pick<NxScrollStrategyFactoryConfig, 'scrollStrategyFactory'>;
        overlay?: Pick<NxScrollStrategyFactoryConfig, 'scrollStrategyFactory'>;
        popover?: Pick<NxScrollStrategyFactoryConfig, 'scrollStrategyFactory'>;
        tooltip?: Pick<NxScrollStrategyFactoryConfig, 'scrollStrategyFactory'>;
    };
}
