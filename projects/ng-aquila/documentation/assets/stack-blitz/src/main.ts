import { provideHttpClient, withInterceptorsFromDi, withJsonpSupport } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule, platformBrowser } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { NgOptimizedImage } from '@angular/common';
import { AgGridModule } from 'ag-grid-angular';

import 'zone.js';

import { AquilaModule } from './app/aquila.module';
import { AquilaDocsExample } from './app/aquila-docs-example';

@NgModule({
  bootstrap: [AquilaDocsExample],
  declarations: [AquilaDocsExample],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([]),
    AquilaModule,
    NgOptimizedImage,
    AgGridModule,
  ],
  providers: [provideHttpClient(withInterceptorsFromDi(), withJsonpSupport())],
})
export class AppModule {}

platformBrowser()
  .bootstrapModule(AppModule)
  .catch((err) => console.error(err));
