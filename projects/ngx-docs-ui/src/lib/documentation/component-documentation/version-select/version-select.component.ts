import { Component, Inject, Input, Optional, ViewChild } from '@angular/core';
import { NxContextMenuTriggerDirective } from '@aposin/ng-aquila/context-menu';

import { NX_DOC_VERSIONS } from '../../../core/tokens';
import { DocVersionChannel, DocVersions } from './../../../core/types';

@Component({
    selector: 'nxv-version-select',
    templateUrl: 'version-select.component.html',
    styleUrls: ['version-select.component.scss'],
})
export class NxVersionSelectComponent {
    _selected = '';
    _versionSelectIsOpened = false;

    @Input() set versions(value: DocVersions) {
        this._versions = value;
        this._selected = value.currentChannel;
    }
    get versions(): DocVersions {
        return this._versions!;
    }
    private _versions: DocVersions | null = null;

    @ViewChild(NxContextMenuTriggerDirective, { static: true }) contextMenuTrigger!: NxContextMenuTriggerDirective;

    constructor(@Optional() @Inject(NX_DOC_VERSIONS) _versions: DocVersions | null) {
        if (_versions) {
            this.versions = _versions;
        }
        // bind it to our component otherwise it's in the context of the dropdown
        this.formatVersion = this.formatVersion.bind(this);
    }

    formatVersion(channel: string) {
        // Only show the version when the current one is selected.
        // We won't know the opposite version, as we don't maintain them
        // in both directions
        if (this.versions && this.versions.currentChannel === channel) {
            return `${channel} (${this.versions.currentVersion})`;
        }

        return `${channel}`;
    }

    mobileFormatVersion(channel: string) {
        // Only show the version when the current one is selected.
        // We won't know the opposite version, as we don't maintain them
        // in both directions
        if (this.versions && this.versions.currentChannel === channel) {
            return `${this.versions.currentVersion}`;
        }

        return `${channel}`;
    }

    changeVersion(channel: DocVersionChannel) {
        if (channel?.url && window.top) {
            window.top.location.href = channel?.url;
        }
    }
}
