import { Component, Inject, Optional, Type } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FORMFIELD_DEFAULT_OPTIONS, FormfieldDefaultOptions } from '@aposin/ng-aquila/formfield';

import { ALLIANZ_ONE, AllianzOneOptions, NxAllianzOneModule } from './allianz-one.module';

@Component({
    template: ` <p>Doesn't matter</p> `,
})
class AllianzOnePresetTest {
    constructor(
        @Optional() @Inject(ALLIANZ_ONE) readonly allianzOne: AllianzOneOptions,
        @Optional() @Inject(FORMFIELD_DEFAULT_OPTIONS) readonly formfieldOptions: FormfieldDefaultOptions,
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
            imports: [NxAllianzOneModule],
            declarations: [AllianzOnePresetTest],
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
                imports: [],
                declarations: [AllianzOnePresetTest],
            })
            .compileComponents();

        createTestComponent(AllianzOnePresetTest);

        expect(testInstance.allianzOne).toBeFalsy();
        expect(testInstance.formfieldOptions).toBeFalsy();
    });
});
