import { NxCardModule } from '@allianz/ng-aquila/card';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';

export function createTestComponent(template: string) {
  @Component({ template, standalone: true, imports: [NxCardModule] })
  class Comp {}
  const fixture = TestBed.createComponent(Comp);
  fixture.detectChanges();
  const loader = TestbedHarnessEnvironment.loader(fixture);
  return { loader, fixture };
}
