import { Component } from '@angular/core';
import { NxAvatarComponent } from '@aposin/ng-aquila/avatar';
import { NxIconComponent } from '@aposin/ng-aquila/icon';
import { NxFigureComponent } from '@aposin/ng-aquila/image';
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
