export function lazyServiceTemplate(modules: any[]): string {
    const resolvedImports = modules.map(m => buildImportForModule(m));

    return `import { Injectable, Compiler, Injector } from '@angular/core';
import { BaseLazyLoadingService } from '@aposin/ngx-docs-ui';

@Injectable({ providedIn: 'root' })
export class LazyLoadingService implements BaseLazyLoadingService {

    constructor(private readonly compiler: Compiler, private readonly injector: Injector) {}

    getComponent(id: string, moduleId: string) {
        return this.load(moduleId).then((moduleClass: any) => {
            return this.compiler.compileModuleAsync(moduleClass).then(ngModuleFactory => {
                const ngModuleRef = ngModuleFactory.create(this.injector);
                const componentClass = moduleClass.components()[id];
                const componentFactory = ngModuleRef.componentFactoryResolver.resolveComponentFactory(componentClass);

                return { componentFactory, ngModuleFactory };
            });
        });
    }

    load(moduleId: string): Promise<any> {
        switch (moduleId) {
            ${resolvedImports.join('\n').trim()}
            default: return Promise.resolve().then(() => null);
        }
    }
}
`;
}

function buildImportForModule(module: any): string {
    const imports = module.relativeImportPath.replace('.ts', '').split('\\').join('/');

    return `            case '${module.name}': return import('${imports}').then(m => m.${module.className});`;
}
