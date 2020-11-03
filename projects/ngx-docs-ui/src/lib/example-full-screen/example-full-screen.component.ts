import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ThemeSwitcherService } from '../documentation/theme-switcher/theme-switcher.service';
import { Location } from '@angular/common';

@Component({
  templateUrl: './example-full-screen.component.html',
  styleUrls: ['./example-full-screen.component.scss']
})
export class ExampleFullScreenComponent implements OnInit {

  constructor(
    private _route: ActivatedRoute,
    private _themeSwitcherService: ThemeSwitcherService,
    public _location: Location) {}

  ngOnInit() {
    const themeName = this._route.snapshot.queryParamMap.get('theme');
    const selectedTheme = this._themeSwitcherService.get(themeName);
    if (selectedTheme) {
      this._themeSwitcherService.switchTheme(selectedTheme);
    }
  }
}
