import { NxDateFormats } from '@aposin/ng-aquila/datefield';

export const NX_ISO_DATE_FORMATS: NxDateFormats = {
    parse: {
        dateInput: 'L',
    },
    display: {
        dateInput: 'L',
        monthYearLabel: 'MMM YYYY',
        dateA11yLabel: 'LL',
        monthYearA11yLabel: 'MMMM YYYY',
    },
};
