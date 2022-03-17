import { Overlay, ScrollStrategy } from '@angular/cdk/overlay';
import { CloseScrollStrategyConfig } from '@angular/cdk/overlay/scroll/close-scroll-strategy';
import { RepositionScrollStrategyConfig } from '@angular/cdk/overlay/scroll/reposition-scroll-strategy';

/** Scroll strategy default presets for overlay-based components. */
export type NxScrollStrategy = 'reposition' | 'block' | 'close' | 'noop';

/** Scroll strategy default preset options for overlay-based components. */
export type NxScrollStrategyOptions = RepositionScrollStrategyConfig & CloseScrollStrategyConfig;

export interface NxScrollStrategyDefaultConfig {
    /** Preset for strategy factory that will be used to handle scrolling while a panel is open. */
    scrollStrategy: NxScrollStrategy;
    /** Additional strategy preset options. */
    scrollStrategyOptions?: NxScrollStrategyOptions;
}

export type NxScrollStrategyFactoryFn = (overlay: Overlay) => () => ScrollStrategy;

export interface NxScrollStrategyFactoryConfig {
    /** Creator function for strategy factory that will be used to handle scrolling while a panel is open. */
    scrollStrategyFactory: NxScrollStrategyFactoryFn;
}
