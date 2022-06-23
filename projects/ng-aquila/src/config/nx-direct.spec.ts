import { Component, Directive, Type, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { NxFormfieldComponent } from '@aposin/ng-aquila/formfield';
import { NxInputModule } from '@aposin/ng-aquila/input';

import { NxDirectModule } from './nx-direct.module';

@Directive()
abstract class PresetTest {
    @ViewChild(NxFormfieldComponent) formfieldInstance!: NxFormfieldComponent;
}

describe('NxDirectPreset', () => {
    let fixture: ComponentFixture<PresetTest>;
    let formfieldInstance: NxFormfieldComponent;

    let testInstance: PresetTest;

    function createTestComponent(component: Type<PresetTest>) {
        fixture = TestBed.createComponent(component);
        fixture.detectChanges();

        testInstance = fixture.componentInstance;
        formfieldInstance = testInstance.formfieldInstance;
    }

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [NxDirectModule, NxInputModule],
            declarations: [FormfieldPresetComponent],
        }).compileComponents();
    }));

    it('should have set floatingLabel to always on default', () => {
        createTestComponent(FormfieldPresetComponent);
        expect(formfieldInstance.floatLabel).toBe('always');
    });

    it('should have set appearance to auto on default', () => {
        createTestComponent(FormfieldPresetComponent);
        expect(formfieldInstance.appearance).toBe('auto');
    });
});

@Component({
    template: `
        <nx-formfield>
            <input nxInput />
        </nx-formfield>
    `,
})
class FormfieldPresetComponent extends PresetTest {}
