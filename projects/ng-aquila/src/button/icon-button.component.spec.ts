import { NxIconComponent } from '@allianz/ng-aquila/icon';
import { Component, Directive, Type, viewChild } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NxAnchorIconButtonComponent, NxIconButtonComponent } from '.';

@Directive({ standalone: true })
abstract class AnchorButtonTest {}

@Component({
  template: ` <button
      nxIconButton
      #button
      href="#"
      class="some-arbitrary-class-name"
      aria-label="Link Text"
    >
      <nx-icon name="info"></nx-icon>
    </button>
    <a nxIconButton #anchor href="#" class="some-arbitrary-class-name" aria-label="Link Text">
      <nx-icon name="info"></nx-icon>
    </a>`,
  imports: [NxIconButtonComponent, NxAnchorIconButtonComponent, NxIconComponent],
})
class TestInstance extends AnchorButtonTest {
  buttonInstance = viewChild.required('button', { read: NxIconButtonComponent });
  anchorInstance = viewChild.required('anchor', { read: NxAnchorIconButtonComponent });
}

describe('NxAnchorIconButtonComponent', () => {
  let fixture: ComponentFixture<TestInstance>;
  let testInstance: TestInstance;

  function createTestComponent(component: Type<TestInstance>) {
    fixture = TestBed.createComponent(component);
    fixture.detectChanges();
    testInstance = fixture.componentInstance;
  }

  it('creates the buttons', waitForAsync(() => {
    createTestComponent(TestInstance);
    expect(testInstance.buttonInstance()).toBeTruthy();
    expect(testInstance.anchorInstance()).toBeTruthy();
  }));

  it('has correct base class', waitForAsync(() => {
    createTestComponent(TestInstance);
    expect(fixture.nativeElement.querySelector('button')).toHaveClass('nx-icon-button');
    expect(fixture.nativeElement.querySelector('a')).toHaveClass('nx-icon-button');
  }));

  describe('a11y', () => {
    it('has no accessibility violations', async () => {
      createTestComponent(TestInstance);
      await expectAsync(fixture.nativeElement).toBeAccessible();
    });
  });
});
