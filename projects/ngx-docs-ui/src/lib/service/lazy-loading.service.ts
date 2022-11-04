import { ComponentFactory, Injectable, NgModuleFactory } from '@angular/core';

export interface LazyLoadingFactoryResult {
    componentFactory: ComponentFactory<unknown>;
    ngModuleFactory: NgModuleFactory<unknown>;
}

@Injectable()
export abstract class BaseLazyLoadingService {
    abstract getComponent(id: string, moduleId: string): Promise<LazyLoadingFactoryResult>;

    abstract load(moduleId: string): Promise<any>;
}
