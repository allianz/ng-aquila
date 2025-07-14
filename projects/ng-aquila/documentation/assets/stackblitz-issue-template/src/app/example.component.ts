import { Component } from '@angular/core';
import { NxButtonModule } from '@allianz/ng-aquila/button';

@Component({
  selector: 'app-example',
  templateUrl: './example.component.html',
  styleUrls: ['./example.component.scss'],
  standalone: true,
  imports: [NxButtonModule], // add necessary imports
})
export class ExampleComponent {}
