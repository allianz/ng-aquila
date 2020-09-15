import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Theme } from './theme-switcher.service';

@Component({
  selector: 'nxv-theme-switch',
  templateUrl: 'theme-switcher.component.html',
  styleUrls: ['theme-switcher.component.scss']
})
export class NxvThemeSwitcherComponent {

  _themeSwitchIsOpened: boolean = false;

  @Input() themes: Theme[] = [];

  @Input() selected: Theme;
  @Output() readonly selectedChange = new EventEmitter<Theme>();

  select(theme: Theme) {
    this.selected = theme;
    this.selectedChange.emit(theme);
  }
}
