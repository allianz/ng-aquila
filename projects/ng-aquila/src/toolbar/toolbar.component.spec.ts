import { Component, Type, ViewChild, Directive } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import * as axe from 'axe-core';

import { NxToolbarComponent } from './toolbar.component';
import { NxToolbarModule } from './toolbar.module';

@Directive()
abstract class ToolbarTest {
  @ViewChild(NxToolbarComponent) toolbarInstance: NxToolbarComponent;
}

describe('NxToolbarComponent', () => {
  let fixture: ComponentFixture<NxToolbarComponent>;
  let testInstance: ToolbarTest;
  let toolbarInstance: NxToolbarComponent;

  const createTestComponent = (component: Type<ToolbarTest>) => {
    fixture = TestBed.createComponent(component);
    fixture.detectChanges();
    testInstance = fixture.debugElement.componentInstance;
    toolbarInstance = testInstance.toolbarInstance;
  };

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        BasicToolbar
      ],
      imports: [
        NxToolbarModule
      ]
    }).compileComponents();
  }));

  it('should create toolbar component', waitForAsync(() => {
    createTestComponent(BasicToolbar);
    expect(toolbarInstance).toBeTruthy();
  }));

  describe('a11y', () => {
    it('has no accessibility violations', function (done) {
      createTestComponent(BasicToolbar);

      axe.run(fixture.nativeElement, {}, (error: Error, results: axe.AxeResults) => {
        expect(results.violations.length).toBe(0);
        done();
      });
    });
  });
});

@Component({
  template: `
      <nx-toolbar></nx-toolbar>
  `
})
class BasicToolbar extends ToolbarTest {
}
