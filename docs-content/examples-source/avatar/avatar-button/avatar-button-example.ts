import { Component } from '@angular/core';
import {
    NxAvatarButtonDirective,
    NxAvatarComponent,
} from '@aposin/ng-aquila/avatar';
import { NxIconComponent } from '@aposin/ng-aquila/icon';
import { NxFigureComponent } from '@aposin/ng-aquila/image';
/**
 * @title Button example
 */
@Component({
    selector: 'avatar-button-example',
    templateUrl: './avatar-button-example.html',
    styleUrls: ['./avatar-button-example.css'],
    standalone: true,
    imports: [
        NxAvatarButtonDirective,
        NxAvatarComponent,
        NxIconComponent,
        NxFigureComponent,
    ],
})
export class AvatarButtonExampleComponent {}
