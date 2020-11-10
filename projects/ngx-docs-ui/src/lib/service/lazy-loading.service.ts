import { ComponentFactory, Injectable } from '@angular/core';
import { NgModuleFactory } from '@angular/core/src/r3_symbols';

@Injectable()
export abstract class BaseLazyLoadingService {
  abstract getComponent(id: string, moduleId: string): Promise<{
    componentFactory: ComponentFactory<unknown>;
    ngModuleFactory: NgModuleFactory<unknown>;
  }>;
  abstract load(moduleId: string): Promise<any>;

}
