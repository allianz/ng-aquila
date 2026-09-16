/** The surface a radio indicator is placed on. */
export type NxRadioIndicatorColorScheme =
  'default' | 'on-selection' | 'on-accent-attention' | 'on-brand-static';

/** The surface a checkbox indicator is placed on. */
export type NxCheckboxIndicatorColorScheme = 'default' | 'on-selection';

/**
 * @deprecated Use {@link NxRadioIndicatorColorScheme} or
 * {@link NxCheckboxIndicatorColorScheme} instead, which each list the schemes their own
 * indicator renders.
 */
export type NxSelectionIndicatorColorScheme = 'default' | 'on-selection';
