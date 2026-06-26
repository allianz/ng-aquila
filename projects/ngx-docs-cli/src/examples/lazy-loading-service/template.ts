export function lazyServiceTemplate(modules: any[]): string {
  const resolvedImports = modules.map((m) => buildImportForModule(m));

  return `import { Injectable, Compiler } from '@angular/core';
import { BaseLazyLoadingService } from '@allianz/ngx-docs-ui';

@Injectable({ providedIn: 'root' })
export class LazyLoadingService implements BaseLazyLoadingService {

    constructor(private readonly compiler: Compiler) {}

    getComponent(id: string, moduleId: string) {
        return this.load(moduleId).then((moduleClass: any) => {
            return this.compiler.compileModuleAsync(moduleClass).then(ngModuleFactory => {
                const componentType = moduleClass.components()[id];

                return { componentFactory: { componentType }, ngModuleFactory };
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
