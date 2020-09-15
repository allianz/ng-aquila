import { Component, Type, ViewChild, Directive } from '@angular/core';
import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import * as axe from 'axe-core';

import { NxCopytextComponent } from './copytext.component';
import { NxCopytextModule } from './copytext.module';

// For better readablity here, We can safely ignore some conventions in our specs
// tslint:disable:component-class-suffix

@Directive()
abstract class CopytextTest {
  @ViewChild(NxCopytextComponent) textInstance: NxCopytextComponent;
  size = '';
}

describe('NxCopytextDirective', () => {
  let fixture: ComponentFixture<CopytextTest>;
  let testInstance: CopytextTest;
  let copytextInstance: NxCopytextComponent;
  let textNativeElement: HTMLButtonElement;

  function createTestComponent(component: Type<CopytextTest>) {
    fixture = TestBed.createComponent(component);
    fixture.detectChanges();
    testInstance = fixture.componentInstance;
    copytextInstance = testInstance.textInstance;
    textNativeElement = <HTMLButtonElement>fixture.nativeElement.querySelector('p');
  }

  function setSize(value) {
    fixture.componentInstance.size = value;
    fixture.detectChanges();
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        BasicCopytext
      ],
      imports: [
        NxCopytextModule
      ]
    }).compileComponents();
  }));

  it('creates the component', async(() => {
    createTestComponent(BasicCopytext);
    expect(copytextInstance).toBeTruthy();
  }));

  it('should use size normal by default', async(() => {
    createTestComponent(BasicCopytext);
    expect(textNativeElement.classList.contains('nx-copy--normal')).toBe(true);
  }));

  it('creates full modifier class from a correct keyword', async(() => {
    createTestComponent(BasicCopytext);
    setSize('small');
    expect(textNativeElement.classList.contains('nx-copy--small')).toBe(true);
    setSize('normal');
    expect(textNativeElement.classList.contains('nx-copy--normal')).toBe(true);
    setSize('medium');
    expect(textNativeElement.classList.contains('nx-copy--medium')).toBe(true);
    setSize('large');
    expect(textNativeElement.classList.contains('nx-copy--large')).toBe(true);
    setSize('negative');
    expect(textNativeElement.classList.contains('nx-copy--negative')).toBe(true);
    setSize('medium negative');
    expect(textNativeElement.classList.contains('nx-copy--medium')).toBe(true);
    expect(textNativeElement.classList.contains('nx-copy--negative')).toBe(true);
  }));

  describe('a11y', () => {
    it('has no accessibility violations', function(done) {
      createTestComponent(BasicCopytext);

      axe.run(fixture.nativeElement, {},  (error: Error, results: axe.AxeResults) => {
        expect(results.violations.length).toBe(0);
        const violationMessages = results.violations.map(item => item.description);
        done();
      });
    });
  });
});

@Component({
  template: `
    <p [nxCopytext]="size">Hello Text</p>
  `
})
class BasicCopytext extends CopytextTest {
}
