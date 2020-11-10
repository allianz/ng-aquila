

export const lazyServiceTemplate = (modules) => {
  const resolvedImports = modules.map(m => buildImportForModule(m));

  return `
  import { Injectable, Compiler, Injector } from '@angular/core';
  import { BaseLazyLoadingService } from '@aposin/ngx-docs-ui';

  @Injectable({providedIn: 'root'})
  export class LazyLoadingService implements BaseLazyLoadingService {

    constructor(private compiler: Compiler, private injector: Injector) {}

    getComponent(id: string, moduleId: string) {
      return this.load(moduleId).then(moduleClass => {
        return this.compiler.compileModuleAsync(moduleClass).then(ngModuleFactory => {
          const ngModuleRef = ngModuleFactory.create(this.injector);
          const componentClass = moduleClass.components()[id];
          const componentFactory = ngModuleRef.componentFactoryResolver.resolveComponentFactory(componentClass);
          
          return {componentFactory, ngModuleFactory};
        })
      })
    }

    load(moduleId: string) {
      switch (moduleId) {
        ${resolvedImports.join('\n').trim()}
    default: return Promise.resolve().then(() => null);
      }
    }
  }
  `
}

const buildImportForModule = (module) => {
  return `
  case '${module.name}': return import('${module.relativeImportPath.replace('.ts', '')}').then(m => m.${module.className});
  `;
}