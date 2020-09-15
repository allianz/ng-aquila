import { Component } from '@angular/core';

/**
* @title Custom separators example
*/
@Component({
  templateUrl: './mask-separators-example.html'
})
export class MaskSeparatorsComponent {
  mask = '00-00 [00]';
  separators = ['-', '[', ']', ' '];
}
