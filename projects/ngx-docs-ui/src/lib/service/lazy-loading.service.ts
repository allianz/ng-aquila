import { Injectable, NgModuleFactory, Type } from '@angular/core';

/**
 * Minimal shape of the legacy `ComponentFactory` consumed by the lazy-loading
 * mechanism. Angular v22 no longer re-exports `ComponentFactory` from
 * `@angular/core` under its public name (only the internal
 * `ɵRender3ComponentFactory` alias remains), so we describe just the member we
 * actually read — `componentType`, used by `NgComponentOutlet`.
 */
export interface LazyLoadedComponentFactory {
  componentType: Type<unknown>;
}

export interface LazyLoadingFactoryResult {
  componentFactory: LazyLoadedComponentFactory;
  ngModuleFactory: NgModuleFactory<unknown>;
}

@Injectable()
export abstract class BaseLazyLoadingService {
  abstract getComponent(id: string, moduleId: string): Promise<LazyLoadingFactoryResult>;

  abstract load(moduleId: string): Promise<any>;
}
