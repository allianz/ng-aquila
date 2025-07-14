import {
  NxAvatarButtonDirective,
  NxAvatarComponent,
} from '@allianz/ng-aquila/avatar';
import { NxIconComponent } from '@allianz/ng-aquila/icon';
import { NxFigureComponent } from '@allianz/ng-aquila/image';
import { Component } from '@angular/core';
/**
 * @title Button example
 */
@Component({
  selector: 'avatar-button-example',
  templateUrl: './avatar-button-example.html',
  styleUrls: ['./avatar-button-example.css'],
  imports: [
    NxAvatarButtonDirective,
    NxAvatarComponent,
    NxIconComponent,
    NxFigureComponent,
  ],
})
export class AvatarButtonExampleComponent {}
