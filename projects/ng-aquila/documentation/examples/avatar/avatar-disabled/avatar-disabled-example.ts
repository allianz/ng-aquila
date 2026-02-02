import { NxAvatarComponent } from '@allianz/ng-aquila/avatar';
import { NxIconComponent } from '@allianz/ng-aquila/icon';
import { NxFigureComponent } from '@allianz/ng-aquila/image';
import { Component } from '@angular/core';
/**
 * @title Disabled example
 */
@Component({
  selector: 'avatar-disabled-example',
  templateUrl: './avatar-disabled-example.html',
  styleUrls: ['./avatar-disabled-example.css'],
  imports: [NxAvatarComponent, NxIconComponent, NxFigureComponent],
})
export class AvatarDisabledExampleComponent {}
