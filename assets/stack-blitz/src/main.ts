import { HttpClientJsonpModule, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { AquilaDocsExample } from './app/aquila-docs-example';
import { AquilaModule } from './app/aquila.module';
import './polyfills';

@NgModule({
    bootstrap: [AquilaDocsExample],
    declarations: [AquilaDocsExample],
    entryComponents: [AquilaDocsExample],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        HttpClientJsonpModule,
        HttpClientModule,
        ReactiveFormsModule,
        RouterModule.forRoot([]),
        AquilaModule,
    ],
})
export class AppModule {}

platformBrowserDynamic()
    .bootstrapModule(AppModule)
    .catch(err => console.error(err));
