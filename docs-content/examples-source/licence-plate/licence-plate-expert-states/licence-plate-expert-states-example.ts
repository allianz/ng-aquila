import { Component } from '@angular/core';

/**
 * @title Licence plate expert states
 */
@Component({
    selector: 'licence-plate-expert-states-example',
    templateUrl: 'licence-plate-expert-states-example.html',
    styleUrls: ['licence-plate-expert-states-example.css'],
})
export class LicencePlateExpertStatesExample {
    disabled: boolean = false;
    readonly: boolean = false;
    value = '';
}
