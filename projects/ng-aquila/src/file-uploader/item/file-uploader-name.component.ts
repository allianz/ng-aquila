import { Component, Input, OnInit } from '@angular/core';

import { getFileExtension } from '../file-uploader.validations';

/** Shows the file name. */
@Component({
    selector: 'nx-file-upload-name',
    styleUrls: ['./file-uploader-name.component.scss'],
    template: `
        <span class="extension">
            <span class="extension-label" *ngIf="extension" [style.background-color]="iconColor[extension] || '#000'">{{ extension }}</span>
            <nx-icon name="file" class="extension-icon"></nx-icon>
        </span>
        <span class="nx-margin-left-2xs">{{ name }}</span>
    `,
})
export class NxFileUploaderItemName implements OnInit {
    /** The filename.*/
    @Input() name!: string;

    iconColor: { [key: string]: string } = {
        xls: '#1E8927',
        xlsx: '#1E8927',
        pdf: '#DC3149',
        png: '#ba31dc',
    };

    extension!: string;

    ngOnInit() {
        this.extension = getFileExtension(this.name).substring(1);
    }
}
