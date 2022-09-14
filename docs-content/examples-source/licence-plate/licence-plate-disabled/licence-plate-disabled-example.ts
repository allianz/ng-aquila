import { Component } from '@angular/core';

/**
 * @title Licence plate standard disabled (Germany)
 */
@Component({
    selector: 'licence-plate-disabled-example',
    templateUrl: 'licence-plate-disabled-example.html',
    styleUrls: ['licence-plate-disabled-example.css'],
})
export class LicencePlateDisabledExample {
    disabled = true;
    value = '';
}
