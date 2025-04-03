import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class NxDateRangeIntl {
    /** ARIA label for the start date input field (used by screen readers) */
    readonly startDateAriaLabel = signal('Start Date');

    /** ARIA label for the end date input field (used by screen readers) */
    readonly endDateAriaLabel = signal('End Date');
}
