import { Injectable, Inject, Optional } from '@angular/core';
import { NXV_MANIFEST_TOKEN } from '../core/tokens';
import { Manifest, ComponentDescriptor, GuideDescriptor, ExampleDescriptor } from '../core/manifest';
import { ReplaySubject } from 'rxjs';

class CategoryChild {
  label: string;
  component: ComponentDescriptor;
}
export class Category {
  label: string;
  children: CategoryChild[];
}

const sortByLabel = function(a, b) {
  const labelA = a.label.toLowerCase();
  const labelB = b.label.toLowerCase();

  if (labelA === 'general') {
    return -1;
  }

  if (labelB === 'general') {
    return 1;
  }

  return labelA > labelB ? 1 : labelA < labelB ? -1 : 0;
};

@Injectable()
export class ManifestService {
  protected _manifestChanges = new ReplaySubject<Manifest>(1);
  public available = new ReplaySubject<Boolean>(1);
  protected _current: Manifest;

  constructor(
    @Optional() @Inject(NXV_MANIFEST_TOKEN)
    private initialManifest: Manifest
  ) {

    this.init();
  }

  init() {
    this.update(Object.assign({}, this.initialManifest));
  }

  isEmpty() {
    const available = this._current !== null && Object.keys(this._current).length === 0 && this._current.constructor === Object;
    return available;
  }

  hasGuide(id: string) {
    return this._current.guides.some(item => item.id === id);
  }

  getGuide(id: string): GuideDescriptor {
    if (this.hasGuide(id) === false) {
      throw new Error(`Could not find Guide with id ${id}`);
    }

    return this._current.guides.find(item => item.id === id);
  }

  hasComponent(id: string) {
    return this._current.components.some(item => item.id === id);
  }

  getComponent(id: string): ComponentDescriptor {
    if (this.hasComponent(id) === false) {
      throw new Error(`Could not find Component with id ${id}`);
    }

    return this._current.components.find(item => item.id === id);
  }

  getGroupedComponents(): Category[] {
    // group components by category
    const componentsDict = this._current.components.reduce(
        (categories, component: ComponentDescriptor) => {

      (categories[component.category] = categories[component.category] || []).push(component);
      return categories;
    }, {});

    // form datastructure
    const groupedCategories = Object.keys(componentsDict).reduce((categories, key: string) => {
      const categoryKey = key.toLowerCase();
      const category = {
        label: categoryKey,
        children: componentsDict[key].map((component: ComponentDescriptor) => ({
          label: component.title,
          component
        }))
      };

      categories.push(category);
      return categories;
    }, []);

    // sort categories and components
    groupedCategories.sort(sortByLabel);
    groupedCategories.map((components) => components.children.sort(sortByLabel));

    return groupedCategories;
  }

  hasExample(id: string) {
    return this._current.examples.some(item => item.id === id);
  }

  getExample(id: string): ExampleDescriptor {
    if (this.hasExample(id) === false) {
      throw new Error(`Could not find Example with id ${id}`);
    }

    return this._current.examples.find(item => item.id === id);
  }

  update(value: Manifest) {
    this._current = value;

    if (this.isEmpty() === false) {
      this._manifestChanges.next(this._current);
      this.available.next(true);
    } else {
      this.available.next(false);
    }
  }

  get manifest(): ReplaySubject<Manifest> {
    return this._manifestChanges;
  }
}
