import { ModuleWithProviders, NgModule } from '@angular/core';

import { getScrollStrategyDefaultProviders, getScrollStrategyFactoryProviders } from './nx-scroll-strategy.helpers';
import { NxScrollStrategyDefaultConfig, NxScrollStrategyFactoryConfig } from './nx-scroll-strategy.models';

/**
 * Provide a specific scroll strategy for a select collection of overlay-based components:
 *
 * - autocomplete
 * - context-menu
 * - datepicker
 * - dropdown
 * - notification-panel
 *
 * These components will be affected only if configured separately in the `extraComponents` property:
 *
 * - dialog
 * - overlay
 * - popover
 * - tooltip
 * @example
 * NxScrollStrategyModule.withConfig({
 *   scrollStrategy: 'close',
 *   scrollStrategyOptions: { threshold: 100 },
 * })
 * @example
 * NxScrollStrategyModule.withFactory({
 *   scrollStrategyFactory: overlay => () => overlay.scrollStrategies.close({ threshold: 100 }),
 * })
 */
@NgModule()
export class NxScrollStrategyModule {
    static withConfig(config: NxScrollStrategyDefaultConfig): ModuleWithProviders<NxScrollStrategyModule> {
        return {
            ngModule: NxScrollStrategyModule,
            providers: getScrollStrategyDefaultProviders(config),
        };
    }

    static withFactory(config: NxScrollStrategyFactoryConfig): ModuleWithProviders<NxScrollStrategyModule> {
        return {
            ngModule: NxScrollStrategyModule,
            providers: getScrollStrategyFactoryProviders(config),
        };
    }
}
