import { HttpClientJsonpModule, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
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
        BrowserAnimationsModule,
        FormsModule,
        HttpClientJsonpModule,
        HttpClientModule,
        ReactiveFormsModule,
        RouterModule.forRoot([]),
        AquilaModule,
        NgOptimizedImage,
        AgGridModule,
    ],
})
export class AppModule {}

platformBrowserDynamic()
    .bootstrapModule(AppModule)
    .catch(err => console.error(err));
