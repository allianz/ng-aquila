import { Component, Type, ViewChild, Directive } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NxExpertModule } from './nx-expert.module';
import { NxFormfieldComponent } from '@aposin/ng-aquila/formfield';
import { NxInputModule } from '@aposin/ng-aquila/input';
import { NxDatefieldModule } from '@aposin/ng-aquila/datefield';
import { NxMomentDateModule } from '@aposin/ng-aquila/moment-date-adapter';
import {
  NxErrorComponent,
  NxErrorModule,
  NxLabelComponent,
  NxLabelModule
} from '@aposin/ng-aquila/base';
import { NxDatepickerToggleComponent } from '@aposin/ng-aquila/datefield';
import { NxTabGroupComponent, NxTabNavBarComponent, NxTabsModule } from '@aposin/ng-aquila/tabs';

@Directive()
abstract class PresetTest {
  @ViewChild(NxDatepickerToggleComponent) datepickerToggleInstance: NxDatepickerToggleComponent<Date>;
  @ViewChild(NxErrorComponent) errorInstance: NxErrorComponent;
  @ViewChild(NxFormfieldComponent) formfieldInstance: NxFormfieldComponent;
  @ViewChild(NxLabelComponent) labelInstance: NxLabelComponent;
  @ViewChild(NxTabGroupComponent) tabGroupInstance: NxTabGroupComponent;
  @ViewChild(NxTabNavBarComponent) tabNavBarInstance: NxTabNavBarComponent;
}

describe('NxExpertPreset', () => {
  let fixture: ComponentFixture<PresetTest>;
  let testInstance: PresetTest;

  let datepickerToggleInstance: NxDatepickerToggleComponent<Date>;
  let formfieldInstance: NxFormfieldComponent;
  let labelInstance: NxLabelComponent;
  let errorInstance: NxErrorComponent;
  let tabGroupInstance: NxTabGroupComponent;
  let tabNavBarInstance: NxTabNavBarComponent;

  function createTestComponent(component: Type<PresetTest>) {
    fixture = TestBed.createComponent(component);
    fixture.detectChanges();

    testInstance = fixture.componentInstance;
    datepickerToggleInstance = testInstance.datepickerToggleInstance;
    errorInstance = testInstance.errorInstance;
    formfieldInstance = testInstance.formfieldInstance;
    labelInstance = testInstance.labelInstance;
    tabGroupInstance = testInstance.tabGroupInstance;
    tabNavBarInstance = testInstance.tabNavBarInstance;
  }

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [
          NxDatefieldModule,
          NxErrorModule,
          NxExpertModule,
          NxInputModule,
          NxLabelModule,
          NxMomentDateModule,
          NxTabsModule
        ],
        declarations: [
          DatepickerPresetComponent,
          ErrorPresetComponent,
          FormfieldPresetComponent,
          LabelPresetComponent,
          TabGroupPresetComponent,
          TabNavBarPresetComponent
        ]
      }).compileComponents();
    })
  );

  describe('formfield presets', () => {
    it('should have set floatingLabel to always on default', () => {
      createTestComponent(FormfieldPresetComponent);
      expect(formfieldInstance.floatLabel).toBe('always');
    });

    it('should have set appearance to auto on default', () => {
      createTestComponent(FormfieldPresetComponent);
      expect(formfieldInstance.appearance).toBe('outline');
    });
  });

  describe('label presets', () => {
    it('should have set size to small on default', () => {
      createTestComponent(LabelPresetComponent);
      expect(labelInstance.size).toBe('small');
    });
  });

  describe('datepicker presets', () => {
    it('should set tabindex of datepicker to -1 on default', () => {
      createTestComponent(DatepickerPresetComponent);
      expect(datepickerToggleInstance.tabindex).toBe(-1);
    });
  });

  describe('error presets', () => {
    it('should set appearance to text on default', () => {
      createTestComponent(ErrorPresetComponent);
      expect(errorInstance.appearance).toBe('text');
    });
  });

  describe('tab-group and tab-nav-bar presets', () => {
    it('should set appearance to expert on default for tab-group', () => {
      createTestComponent(TabGroupPresetComponent);
      expect(tabGroupInstance.appearance).toBe('expert');
    });

    it('should set appearance to expert on default for tab-nav-bar', () => {
      createTestComponent(TabNavBarPresetComponent);
      expect(tabNavBarInstance.appearance).toBe('expert');
    });
  });
});

@Component({
  template: `
    <input nxDatefield nxInput [nxDatepicker]="myDatepicker1" />
    <nx-datepicker-toggle [for]="myDatepicker1" nxFormfieldSuffix></nx-datepicker-toggle>
    <nx-datepicker #myDatepicker1></nx-datepicker>
  `
})
class DatepickerPresetComponent extends PresetTest {}

@Component({
  template: `
    <nx-error>This is a preset error</nx-error>
  `
})
class ErrorPresetComponent extends PresetTest {}

@Component({
  template: `
    <nx-formfield>
      <input nxInput>
    </nx-formfield>
  `
})
class FormfieldPresetComponent extends PresetTest {}

@Component({
  template: `
    <nx-label>I am a preset label</nx-label>
  `
})
class LabelPresetComponent extends PresetTest {}

@Component({
  template: `
    <nx-tab-group>
      <nx-tab label="First tab">
        Fill in your first content!
      </nx-tab>
      <nx-tab label="Second tab">
        Fill in your second content!
      </nx-tab>
    </nx-tab-group>
  `
})
class TabGroupPresetComponent extends PresetTest {}

@Component({
  template: `
    <nx-tab-nav-bar>
      <a
        nxTabLink *ngFor="let link of links"
        (click)="setActiveLink(link)"
        [active]="currentLink.label === link.label"
        routerLink="...">
          {{link.label}}
      </a>
    </nx-tab-nav-bar>
  `
})
class TabNavBarPresetComponent extends PresetTest {
  links = [
    { label: 'Subpage 1' },
    { label: 'Subpage 2' },
    { label: 'Subpage 3' }
  ];

  currentLink = this.links[0];

  setActiveLink(link) {
    if (!link.disabled) {
      this.currentLink = link;
    }
  }
}
