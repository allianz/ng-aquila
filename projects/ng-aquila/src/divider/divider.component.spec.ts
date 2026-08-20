import { ChangeDetectionStrategy, Component, Directive, Type, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NxDividerComponent } from './divider.component';
import { NxDividerModule } from './divider.module';

@Directive({ standalone: true })
abstract class DividerTest {
  @ViewChild(NxDividerComponent)
  dividerInstance!: NxDividerComponent;
}

describe('NxDividerComponent', () => {
  let fixture: ComponentFixture<DividerTest>;
  let componentInstance: NxDividerComponent;
  let dividerNativeElement: HTMLElement;

  function createTestComponent(component: Type<DividerTest>) {
    fixture = TestBed.createComponent(component);
    fixture.detectChanges();
    componentInstance = fixture.componentInstance.dividerInstance;
    dividerNativeElement = fixture.nativeElement.querySelector('nx-divider') as HTMLElement;
  }

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [NxDividerModule, BasicDivider],
    }).compileComponents();
  }));

  it('should create', () => {
    createTestComponent(BasicDivider);
    expect(componentInstance).toBeTruthy();
  });

  it('should have the nx-divider class', () => {
    createTestComponent(BasicDivider);
    expect(dividerNativeElement).toHaveClass('nx-divider');
  });

  it('should have the separator role', () => {
    createTestComponent(BasicDivider);
    expect(dividerNativeElement.getAttribute('role')).toBe('separator');
  });

  describe('a11y', () => {
    it('has no accessibility violations', async () => {
      createTestComponent(BasicDivider);
      await expect(fixture.nativeElement).toBeAccessible();
    });
  });
});

@Component({
  selector: 'test-basic-divider',
  template: `<nx-divider></nx-divider>`,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NxDividerModule],
})
class BasicDivider extends DividerTest {}
