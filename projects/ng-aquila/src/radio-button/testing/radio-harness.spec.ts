import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { NxRadioModule } from '@aposin/ng-aquila/radio-button';

import { NxRadioHarness } from './radio-harness';

it('should return label', async () => {
    const { loader } = createComponent('<nx-radio>   My Foo </nx-radio>');

    const radio = await loader.getHarness(NxRadioHarness);

    expect(await radio.getLabel()).toBe('My Foo');
});

it('should find radio by label', async () => {
    const { loader } = createComponent('<nx-radio>My Foo</nx-radio> <nx-radio>My Bar</nx-radio>');

    const radio = await loader.getHarness(NxRadioHarness.with({ label: 'My Bar' }));

    expect(await radio.getLabel()).toBe('My Bar');
});

it('should determine whether radio is checked', async () => {
    const { loader } = createComponent('<nx-radio [checked]="true">My Foo</nx-radio> <nx-radio>My Bar</nx-radio>');

    const radioFoo = await loader.getHarness(NxRadioHarness.with({ label: 'My Foo' }));
    const radioBar = await loader.getHarness(NxRadioHarness.with({ label: 'My Bar' }));

    expect(await radioFoo.isChecked()).toBe(true);
    expect(await radioBar.isChecked()).toBe(false);
});

it('should mark radio as checked after click', async () => {
    const { loader } = createComponent('<nx-radio [checked]="true">My Foo</nx-radio>');

    const radio = await loader.getHarness(NxRadioHarness);
    await radio.click();

    expect(await radio.isChecked()).toBe(true);
});

it('should find radio by checked state', async () => {
    const { loader } = createComponent('<nx-radio [checked]="true">My Foo</nx-radio> <nx-radio [checked]="false">My Bar</nx-radio>');

    const checkedRadio = await loader.getHarness(NxRadioHarness.with({ checked: true }));
    const uncheckedRadio = await loader.getHarness(NxRadioHarness.with({ checked: false }));

    expect(await checkedRadio.getLabel()).toBe('My Foo');
    expect(await uncheckedRadio.getLabel()).toBe('My Bar');
});

it('should determine whether radio is disabled', async () => {
    const { loader } = createComponent('<nx-radio disabled>My Foo</nx-radio>');

    const radio = await loader.getHarness(NxRadioHarness);
    expect(await radio.isDisabled()).toBe(true);
});

it('should find radio by enabled state', async () => {
    const { loader } = createComponent('<nx-radio disabled>My Foo</nx-radio> <nx-radio>My Bar</nx-radio>');

    const radioFoo = await loader.getHarness(NxRadioHarness.with({ enabled: false }));
    const radioBar = await loader.getHarness(NxRadioHarness.with({ enabled: true }));

    expect(await radioFoo.getLabel()).toBe('My Foo');
    expect(await radioFoo.isDisabled()).toBe(true);
    expect(await radioBar.getLabel()).toBe('My Bar');
    expect(await radioBar.isDisabled()).toBe(false);
});

function createComponent(template: string) {
    @Component({ template, standalone: true, imports: [NxRadioModule] })
    class Comp {}
    const fixture = TestBed.createComponent(Comp);
    fixture.detectChanges();
    const loader = TestbedHarnessEnvironment.loader(fixture);
    return { loader, fixture };
}
