import {
  NxAvatarComponent,
  NxAvatarIndicatorDirective,
} from '@allianz/ng-aquila/avatar';
import { NxIconComponent } from '@allianz/ng-aquila/icon';
import { NxIndicatorComponent } from '@allianz/ng-aquila/indicator';
import { Component } from '@angular/core';

/**
 * @title Indicator example
 */
@Component({
  selector: 'avatar-indicator-example',
  templateUrl: './avatar-indicator-example.html',
  styleUrls: ['./avatar-indicator-example.css'],
  imports: [
    NxAvatarComponent,
    NxAvatarIndicatorDirective,
    NxIconComponent,
    NxIndicatorComponent,
  ],
})
export class AvatarIndicatorExampleComponent {}
