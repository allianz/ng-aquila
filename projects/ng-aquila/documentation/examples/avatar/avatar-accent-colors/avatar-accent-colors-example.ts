import {
  NxAvatarButtonDirective,
  NxAvatarComponent,
} from '@allianz/ng-aquila/avatar';
import { NxIconComponent } from '@allianz/ng-aquila/icon';
import { Component } from '@angular/core';
/**
 * @title Colors example
 */
@Component({
  selector: 'avatar-accent-colors-example',
  templateUrl: './avatar-accent-colors-example.html',
  styleUrls: ['./avatar-accent-colors-example.css'],
  imports: [NxAvatarButtonDirective, NxAvatarComponent, NxIconComponent],
})
export class AvatarAccentColorsExampleComponent {}
