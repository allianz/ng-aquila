import { Component } from '@angular/core';

/**
* @title Progress Bar Basic Example
*/
@Component({
  selector: 'progressbar-basic-example',
  templateUrl: './progressbar-basic-example.html',
  styleUrls: ['./progressbar-basic-example.css']
})
export class ProgressbarBasicExampleComponent {
  myProgress: number = 0.3;
}
