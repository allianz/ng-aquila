import { Component } from '@angular/core';

/**
* @title Custom separators example
*/
@Component({
  templateUrl: './mask-separators-example.html'
})
export class MaskSeparatorsExampleComponent {
  mask = '00-00 [00]';
  separators = ['-', '[', ']', ' '];
}
