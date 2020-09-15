import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import parseColor from 'parse-color';
import { ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'nxv-css-var-sidebar',
  templateUrl: 'css-var-sidebar.component.html',
  styleUrls: ['css-var-sidebar.component.scss'],
  host: {
    '[class.sidebar-hidden]': '!shown'
  },
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class CssVarSidebarComponent {
  shown = true;

  properties;
  displayedProperties;
  filterValue: string = '';

  constructor(private _changeDetectorRef: ChangeDetectorRef) { }

  getCustomProperties() {
    return Array.from(document.styleSheets)
      .reduce((rules, styleSheet: CSSStyleSheet) => {
        if (styleSheet.cssRules) {
          Array.from(styleSheet.cssRules)
            .reduce((innerRules, cssRule: CSSStyleRule) => {
              if (cssRule.selectorText === ':root') {
                let css = cssRule.cssText.split('{');
                css = css[1].replace('}', '').split(';');
                for (let i = 0; i < css.length; i++) {
                  const prop = css[i].split(':');
                  if (prop.length === 2 && prop[0].indexOf('--') === 1) {
                    innerRules.push(prop[0].trim());
                  }
                }
              }
              return innerRules;
            }, rules);
        }
        return rules;
      }, []);
  }

  parseProperties(props) {
    const styles = getComputedStyle(document.documentElement);
    const values = props.map(name => {
      const cssVarValue = styles.getPropertyValue(name).trim();

      const parsed = parseColor(cssVarValue);
      let type = '';
      let value = '';

      if (parsed.keyword === 'transparent') {
        type = 'color';
        value = 'rgba(0, 0, 0, 0)';
      } else if (parsed.rgba) {
        type = 'color';
        value = 'rgba(' + parsed.rgba.join(',') + ')';
      } else {
        type = 'text';
        value = cssVarValue;
      }
      return { type, value, name };
    });

    return values;
  }

  updateProperty(newValue, prop) {
    document.documentElement.style.setProperty(prop.name, newValue);
  }

  toggle() {
    this.shown = !this.shown;
  }

  filterProperties() {
    this.displayedProperties = this.properties.filter(
      prop => prop.name.toLocaleLowerCase().indexOf(this.filterValue.toLocaleLowerCase()) >= 0
        || prop.value.toLocaleLowerCase().indexOf(this.filterValue.toLocaleLowerCase()) >= 0
    );
  }

  showAllProperties() {
    this.filterValue = '';
    this.displayedProperties = this.properties;
  }

  reset() {
    const properties = this.getCustomProperties();
    properties.forEach(p => document.documentElement.style.removeProperty(p));
    this.properties = this.parseProperties(properties);
    this.filterProperties();
    this._changeDetectorRef.markForCheck();
  }

  trackProperties(index, element) {
    return element.name;
  }
}
