import { InjectionToken } from '@angular/core';

/**
 * Interface for providing custom labels in a simple pagination.
 * With an implementation you can localize your pagination with the NX_PAGINATION_TEXTS injection token.
 */
export interface IPaginationTexts {
    /** Label that should replace 'previous'. */
    previous: string;

    /** Label that should replace 'next'. */
    next: string;

    /**
     * Label that should replace 'first'.
     *
     * Optional attribute needed only for the advanced pagination.
     */
    first?: string;

    /**
     * Label that should replace 'last'.
     *
     * Optional attribute needed only for the advanced pagination.
     */
    last?: string;

    /** Label that should replace 'of'. */
    ofLabel: string;

    /** Label that should replace the aria label. */
    ariaLabel: string;
}

export const DefaultPaginationTexts = {
    previous: 'Previous',
    next: 'Next',
    first: 'First',
    last: 'Last',
    ofLabel: 'of',
    ariaLabel: 'Please select your page',
};

/** InjectionToken for pagination that can be used to override default locale code. */
export const NX_PAGINATION_TEXTS = new InjectionToken<IPaginationTexts>('nx-pagination-texts');
