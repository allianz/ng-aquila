import { NxAvatarComponent } from '@allianz/ng-aquila/avatar';
import { NxIconComponent } from '@allianz/ng-aquila/icon';
import { NxFigureComponent } from '@allianz/ng-aquila/image';
import { Component } from '@angular/core';
/**
 * @title Avatar example
 */
@Component({
  selector: 'avatar-example',
  templateUrl: './avatar-example.html',
  styleUrls: ['./avatar-example.css'],
  imports: [NxAvatarComponent, NxIconComponent, NxFigureComponent],
})
export class AvatarExampleComponent {}
