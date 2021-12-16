import { InjectionToken } from '@angular/core';

export type NxTabsAppearance = 'expert' | 'default';

export interface TabGroupDefaultOptions {
    /** Sets the default appearance. */
    appearance?: NxTabsAppearance;
}

export const TAB_GROUP_DEFAULT_OPTIONS = new InjectionToken<TabGroupDefaultOptions>('TAB_GROUP_DEFAULT_OPTIONS');

export interface TabNavBarDefaultOptions {
    /** Sets the default appearance. */
    appearance?: NxTabsAppearance;
}

export const TAB_NAV_BAR_DEFAULT_OPTIONS = new InjectionToken<TabNavBarDefaultOptions>('TAB_NAV_BAR_DEFAULT_OPTIONS');
