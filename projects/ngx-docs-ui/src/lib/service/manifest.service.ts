import { Inject, Injectable, Optional } from '@angular/core';
import { ReplaySubject } from 'rxjs';

import { ComponentDescriptor, ExampleDescriptor, GuideDescriptor, Manifest } from '../core/manifest';
import { NXV_MANIFEST_TOKEN } from '../core/tokens';

class CategoryChild {
    label!: string;
    component!: ComponentDescriptor;
}
export class Category {
    label!: string;
    children!: CategoryChild[];
}

function sortByLabel(a: { label: string }, b: { label: string }) {
    const labelA = a.label.toLowerCase();
    const labelB = b.label.toLowerCase();

    if (labelA === 'general') {
        return -1;
    }

    if (labelB === 'general') {
        return 1;
    }

    return labelA > labelB ? 1 : labelA < labelB ? -1 : 0;
}

@Injectable()
export class ManifestService {
    protected readonly _manifestChanges = new ReplaySubject<Manifest>(1);
    readonly available = new ReplaySubject<boolean>(1);
    protected _current!: Manifest;

    constructor(@Optional() @Inject(NXV_MANIFEST_TOKEN) private readonly initialManifest: Manifest | null) {
        this.init();
    }

    init() {
        this.update({ ...(this.initialManifest ?? { api: [], components: [], examples: [], guides: [] }) });
    }

    isEmpty() {
        const available = this._current !== null && Object.keys(this._current).length === 0 && this._current.constructor === Object;
        return available;
    }

    hasGuide(id: string) {
        return this._current.guides.some(item => item.id === id);
    }

    getGuide(id: string): GuideDescriptor {
        if (!this.hasGuide(id)) {
            throw new Error(`Could not find Guide with id ${id}`);
        }

        return this._current.guides.find(item => item.id === id)!;
    }

    hasComponent(id: string) {
        return this._current.components.some(item => item.id === id);
    }

    getComponent(id: string): ComponentDescriptor {
        if (!this.hasComponent(id)) {
            throw new Error(`Could not find Component with id ${id}`);
        }

        return this._current.components.find(item => item.id === id)!;
    }

    getGroupedComponents(): Category[] {
        // group components by category
        const componentsDict: { [key: string]: any[] } = this._current.components.reduce((categories: any, component: ComponentDescriptor) => {
            (categories[component.category] = categories[component.category] || []).push(component);
            return categories;
        }, {});

        // form datastructure
        const groupedCategories = Object.entries(componentsDict).reduce<Category[]>((categories, [key, components]) => {
            const categoryKey = key.toLowerCase();
            const category = {
                label: categoryKey,
                children: components.map((component: ComponentDescriptor) => ({
                    label: component.title,
                    component,
                })),
            };

            categories.push(category);
            return categories;
        }, []);

        // sort categories and components
        groupedCategories.sort(sortByLabel);
        groupedCategories.map((components: { children: any[] }) => components.children.sort(sortByLabel));

        return groupedCategories;
    }

    hasExample(id: string) {
        return this._current.examples.some(item => item.id === id);
    }

    getExample(id: string): ExampleDescriptor {
        if (!this.hasExample(id)) {
            throw new Error(`Could not find Example with id ${id}`);
        }

        return this._current.examples.find(item => item.id === id)!;
    }

    update(value: Manifest) {
        this._current = value;

        if (this.isEmpty()) {
            this.available.next(false);
        } else {
            this._manifestChanges.next(this._current);
            this.available.next(true);
        }
    }

    get manifest(): ReplaySubject<Manifest> {
        return this._manifestChanges;
    }
}
