import { FORMFIELD_DEFAULT_OPTIONS, FormfieldDefaultOptions } from '@allianz/ng-aquila/formfield';
import { Component, Inject, Optional, Type } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ALLIANZ_ONE, AllianzOneOptions, NxAllianzOneModule } from './allianz-one.module';

@Component({
  template: ` <p>Doesn't matter</p> `,
  imports: [NxAllianzOneModule],
})
class AllianzOnePresetTest {
  constructor(
    @Optional() @Inject(ALLIANZ_ONE) readonly allianzOne: AllianzOneOptions,
    @Optional()
    @Inject(FORMFIELD_DEFAULT_OPTIONS)
    readonly formfieldOptions: FormfieldDefaultOptions,
  ) {}
}

@Component({
  template: ` <p>Doesn't matter</p> `,
  imports: [],
})
class AllianzOneWithoutModuleImportPresetTest {
  constructor(
    @Optional() @Inject(ALLIANZ_ONE) readonly allianzOne: AllianzOneOptions,
    @Optional()
    @Inject(FORMFIELD_DEFAULT_OPTIONS)
    readonly formfieldOptions: FormfieldDefaultOptions,
  ) {}
}

describe('NxAllianzOneModule', () => {
  let fixture: ComponentFixture<AllianzOnePresetTest>;

  let testInstance: AllianzOnePresetTest;

  function createTestComponent(component: Type<AllianzOnePresetTest>) {
    fixture = TestBed.createComponent(component);
    fixture.detectChanges();

    testInstance = fixture.componentInstance;
  }

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [NxAllianzOneModule, AllianzOnePresetTest],
    }).compileComponents();

    createTestComponent(AllianzOnePresetTest);
  }));

  it('should have formfield default options', () => {
    expect(testInstance.formfieldOptions).toBeTruthy();
    expect(testInstance.formfieldOptions.appearance).toBe('outline');
    expect(testInstance.formfieldOptions.nxFloatLabel).toBe('always');
  });

  it('should provide allianz one token', () => {
    expect(testInstance.allianzOne).toBeTruthy();
  });

  it('should not provide tokens when not imported', () => {
    TestBed.resetTestingModule()
      .configureTestingModule({
        imports: [AllianzOneWithoutModuleImportPresetTest],
      })
      .compileComponents();

    createTestComponent(AllianzOneWithoutModuleImportPresetTest);

    expect(testInstance.allianzOne).toBeFalsy();
    expect(testInstance.formfieldOptions).toBeFalsy();
  });
});
