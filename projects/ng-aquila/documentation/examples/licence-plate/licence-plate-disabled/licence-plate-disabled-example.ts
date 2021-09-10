import { Component } from '@angular/core';

/**
 * @title Licence plate standard disabled (Germany)
 */
@Component({
  templateUrl: 'licence-plate-disabled-example.html',
  selector: 'licence-plate-disabled-example'
})

export class LicencePlateDisabledExample {
  disabled: boolean = true;
  value = '';
}
