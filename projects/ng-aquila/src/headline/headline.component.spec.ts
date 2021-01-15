import { Component, Type, ViewChild, Directive } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import * as axe from 'axe-core';

import { NxHeadlineComponent } from './headline.component';
import { NxHeadlineModule } from './headline.module';

// For better readablity here, We can safely ignore some conventions in our specs
// tslint:disable:component-class-suffix

@Directive()
abstract class HeadlineTest {
  @ViewChild(NxHeadlineComponent) headlineInstance: NxHeadlineComponent;
  size = '';
}

describe('NxHeadlineDirective', () => {
  let fixture: ComponentFixture<HeadlineTest>;
  let testInstance: HeadlineTest;
  let headlineInstance: NxHeadlineComponent;
  let headlineNativeElement: HTMLHeadingElement;

  function createTestComponent(component: Type<HeadlineTest>) {
    fixture = TestBed.createComponent(component);
    fixture.detectChanges();
    testInstance = fixture.componentInstance;
    headlineInstance = testInstance.headlineInstance;
    headlineNativeElement = (fixture.nativeElement.querySelector('h1') as HTMLHeadingElement);
  }

  function setSize(value) {
    fixture.componentInstance.size = value;
    fixture.detectChanges();
  }

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        BasicHeadline,
        HeadlineWithArbitraryClass
      ],
      imports: [
        NxHeadlineModule
      ]
    }).compileComponents();
  }));

  it('creates the Headline', waitForAsync(() => {
    createTestComponent(BasicHeadline);
    expect(headlineInstance).toBeTruthy();
  }));

  it('should use type section by default', waitForAsync(() => {
    createTestComponent(BasicHeadline);
    setSize('section');
    expect(headlineNativeElement.classList).toContain('nx-heading--section');
  }));

  it('creates full modifier class from a correct keyword', waitForAsync(() => {
    createTestComponent(BasicHeadline);
    setSize('page');
    expect(headlineNativeElement.classList).toContain('nx-heading--page');

    setSize('page-bold-caps');
    expect(headlineNativeElement.classList).toContain('nx-heading--page-bold-caps');

    setSize('section');
    expect(headlineNativeElement.classList).toContain('nx-heading--section');

    setSize('subsection-large');
    expect(headlineNativeElement.classList).toContain('nx-heading--subsection-large');

    setSize('subsection-medium');
    expect(headlineNativeElement.classList).toContain('nx-heading--subsection-medium');

    setSize('subsection-small');
    expect(headlineNativeElement.classList).toContain('nx-heading--subsection-small');

    setSize('subsection-xsmall');
    expect(headlineNativeElement.classList).toContain('nx-heading--subsection-xsmall');

    setSize('negative');
    expect(headlineNativeElement.classList).toContain('nx-heading--negative');

    setSize('section negative');
    expect(headlineNativeElement.classList).toContain('nx-heading--section');
    expect(headlineNativeElement.classList).toContain('nx-heading--negative');
  }));

  it('passes through an unknown class', waitForAsync(() => {
    createTestComponent(HeadlineWithArbitraryClass);
    expect(headlineNativeElement.classList).toContain('some-arbitray-class-name');
  }));

  describe('a11y', () => {
    it('has no accessibility violations', function(done) {
      createTestComponent(BasicHeadline);

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
    <h1 [nxHeadline]="size">Hello Headline</h1>
  `
})
class BasicHeadline extends HeadlineTest {
}

@Component({
  template: `
    <h1 nxHeadline="page" class="some-arbitray-class-name">With arbitrary class</h1>
  `
})
class HeadlineWithArbitraryClass extends HeadlineTest {
}
