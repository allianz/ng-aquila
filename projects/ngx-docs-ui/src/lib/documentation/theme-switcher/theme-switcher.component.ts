import { NgFor } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NxButtonModule } from '@aposin/ng-aquila/button';
import { NxContextMenuModule } from '@aposin/ng-aquila/context-menu';
import { NxIconModule, NxIconRegistry } from '@aposin/ng-aquila/icon';

import { Theme } from './theme-switcher.service';

@Component({
    selector: 'nxv-theme-switch',
    templateUrl: 'theme-switcher.component.html',
    styleUrls: ['theme-switcher.component.scss'],
    standalone: true,
    imports: [NxButtonModule, NxContextMenuModule, NxIconModule, NgFor],
})
export class NxvThemeSwitcherComponent {
    _themeSwitchIsOpened = false;

    @Input() themes: Theme[] = [];

    @Input() selected!: Theme;
    @Output() readonly selectedChange = new EventEmitter<Theme>();

    constructor(private readonly iconRegistry: NxIconRegistry) {
        this.iconRegistry.registerFont('fa', 'fas', 'fa-');
        this.iconRegistry.addFontIcon('fill-drip', 'fill-drip', 'fa');
    }

    select(theme: Theme) {
        this.selected = theme;
        this.selectedChange.emit(theme);
    }
}
