import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import parseColor from 'parse-color';

@Component({
    selector: 'nxv-css-var-sidebar',
    templateUrl: 'css-var-sidebar.component.html',
    styleUrls: ['css-var-sidebar.component.scss'],
    host: {
        '[class.sidebar-hidden]': '!shown',
    },
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CssVarSidebarComponent {
    shown = true;

    properties!: any[];
    displayedProperties: any;
    filterValue = '';

    constructor(private readonly _cdr: ChangeDetectorRef) {}

    getCustomProperties() {
        return Array.from(document.styleSheets).reduce((rules, styleSheet: CSSStyleSheet, currIdx) => {
            if (styleSheet.cssRules) {
                Array.from(styleSheet.cssRules).reduce((innerRules: string[], cssRule: any) => {
                    if (cssRule.selectorText?.includes(':root')) {
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

    parseProperties(props: string[]) {
        const styles = getComputedStyle(document.documentElement);
        const values = props.map((name: string) => {
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

    updateProperty(newValue: string | null, prop: { name: string }) {
        document.documentElement.style.setProperty(prop.name, newValue);
    }

    toggle() {
        this.shown = !this.shown;
    }

    filterProperties() {
        this.displayedProperties = this.properties.filter(
            (prop: { name: string; value: string }) =>
                prop.name.toLocaleLowerCase().includes(this.filterValue.toLocaleLowerCase()) ||
                prop.value.toLocaleLowerCase().includes(this.filterValue.toLocaleLowerCase()),
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
        this._cdr.markForCheck();
    }

    trackProperties(index: unknown, element: HTMLInputElement) {
        return element.name;
    }
}
