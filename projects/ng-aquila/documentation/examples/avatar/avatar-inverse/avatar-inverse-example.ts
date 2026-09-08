import {
  NxAvatarAccentColor,
  NxAvatarComponent,
} from '@allianz/ng-aquila/avatar';
import { NxIconComponent } from '@allianz/ng-aquila/icon';
import { NxFigureComponent } from '@allianz/ng-aquila/image';
import { Component } from '@angular/core';

/**
 * @title Inverse example
 */
@Component({
  selector: 'avatar-inverse-example',
  templateUrl: './avatar-inverse-example.html',
  styleUrls: ['./avatar-inverse-example.css'],
  imports: [NxAvatarComponent, NxIconComponent, NxFigureComponent],
})
export class AvatarInverseExampleComponent {
  readonly accentColors: NxAvatarAccentColor[] = [
    'yellow',
    'orange',
    'red',
    'purple',
    'teal',
    'aqua',
    'blue',
    'green',
    'gray',
  ];
}
