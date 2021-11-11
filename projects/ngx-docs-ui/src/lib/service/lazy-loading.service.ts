import { ComponentFactory, Injectable } from '@angular/core';
import { NgModuleFactory, PlatformRef, createNgModuleRef } from '@angular/core';

@Injectable()
export abstract class BaseLazyLoadingService {
  abstract getComponent(id: string, moduleId: string): Promise<{
    componentFactory: ComponentFactory<unknown>;
    ngModuleFactory: NgModuleFactory<unknown>;
  }>;
  abstract load(moduleId: string): Promise<any>;

}
