import { NxSurface, NxSurfaceType } from '@allianz/ng-aquila/surface';
import {
  ChangeDetectionStrategy,
  Component,
  Directive,
  QueryList,
  signal,
  Type,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NxBreadcrumbComponent, NxBreadcrumbType } from './breadcrumb.component';
import { NxBreadcrumbModule } from './breadcrumb.module';
import { NxBreadcrumbItemComponent } from './breadcrumb-item.component';

@Directive({ standalone: true })
abstract class BreadcrumbTest {
  @ViewChild(NxBreadcrumbComponent)
  breadcrumbInstance!: NxBreadcrumbComponent;
  @ViewChildren(NxBreadcrumbItemComponent)
  breadcrumbItems!: QueryList<NxBreadcrumbItemComponent>;
}

describe('NxBreadcrumbComponent', () => {
  let fixture: ComponentFixture<BreadcrumbTest>;
  let testInstance: BreadcrumbTest;
  let breadcrumbItemInstances: NodeListOf<HTMLElement>;

  function createTestComponent(component: Type<BreadcrumbTest>) {
    fixture = TestBed.createComponent(component);
    fixture.detectChanges();
    testInstance = fixture.componentInstance;
    breadcrumbItemInstances = fixture.nativeElement.querySelectorAll('.nx-breadcrumb-item');
  }

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        NxBreadcrumbModule,
        BasicBreadcrumbComponent,
        BreadcrumbOnPushComponent,
        DynamicBreadcrumbComponent,
        LinkBreadcrumbComponent,
        InverseBreadcrumbComponent,
        SurfaceBreadcrumbComponent,
      ],
    }).compileComponents();
  }));

  it('should create the breadcrumb component', () => {
    createTestComponent(BasicBreadcrumbComponent);
    expect(testInstance.breadcrumbInstance).toBeTruthy();
    expect(testInstance.breadcrumbItems).toBeTruthy();
  });

  it('should apply negative style on programmatic change', () => {
    createTestComponent(BreadcrumbOnPushComponent);
    expect(fixture.nativeElement.querySelector('.is-negative')).toBeTruthy();
    testInstance.breadcrumbInstance.negative = false;
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.is-negative')).toBeFalsy();
  });

  it('should change negative style via input', () => {
    createTestComponent(BasicBreadcrumbComponent);
    expect(fixture.nativeElement.querySelector('.is-negative')).toBeFalsy();
    (testInstance as BasicBreadcrumbComponent).negative = true;
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.is-negative')).toBeTruthy();
    expect(testInstance.breadcrumbInstance.negative).toBe(true);
  });

  it('should apply inverse style via input', () => {
    createTestComponent(InverseBreadcrumbComponent);
    const ol: HTMLElement = fixture.nativeElement.querySelector('ol');
    expect(ol).not.toHaveClass('is-negative');

    (testInstance as InverseBreadcrumbComponent).inverse = true;
    fixture.detectChanges();
    expect(ol).toHaveClass('is-negative');
    expect(testInstance.breadcrumbInstance.negative).toBe(true);
  });

  it('should combine inverse with the primary type', () => {
    createTestComponent(InverseBreadcrumbComponent);
    (testInstance as InverseBreadcrumbComponent).inverse = true;
    (testInstance as InverseBreadcrumbComponent).type = 'primary';
    fixture.detectChanges();

    const ol: HTMLElement = fixture.nativeElement.querySelector('ol');
    expect(ol).toHaveClass('is-negative');
    expect(ol).toHaveClass('is-primary');
  });

  it('should apply the primary type without inverse', () => {
    createTestComponent(InverseBreadcrumbComponent);
    const ol: HTMLElement = fixture.nativeElement.querySelector('ol');
    expect(ol).not.toHaveClass('is-primary');

    (testInstance as InverseBreadcrumbComponent).type = 'primary';
    fixture.detectChanges();
    expect(ol).toHaveClass('is-primary');
    expect(ol).not.toHaveClass('is-negative');
  });

  it('should follow the attention surface while inverse is unset', () => {
    createTestComponent(SurfaceBreadcrumbComponent);
    expect(fixture.nativeElement.querySelector('ol')).toHaveClass('is-negative');
  });

  it('should not apply inverse style on the default surface', () => {
    createTestComponent(SurfaceBreadcrumbComponent);
    (testInstance as SurfaceBreadcrumbComponent).surface.set('default');
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('ol')).not.toHaveClass('is-negative');
  });

  it('should stay non-inverse on the attention surface when inverse is explicitly false', () => {
    createTestComponent(SurfaceBreadcrumbComponent);
    (testInstance as SurfaceBreadcrumbComponent).inverse = false;
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('ol')).not.toHaveClass('is-negative');
  });

  it('should combine the primary type with the attention surface', () => {
    createTestComponent(SurfaceBreadcrumbComponent);
    (testInstance as SurfaceBreadcrumbComponent).type = 'primary';
    fixture.detectChanges();

    const ol: HTMLElement = fixture.nativeElement.querySelector('ol');
    expect(ol).toHaveClass('is-primary');
    expect(ol).toHaveClass('is-negative');
  });

  it('should have appearence "link"', () => {
    createTestComponent(LinkBreadcrumbComponent);
    expect(fixture.nativeElement.querySelector('ol')).toHaveClass('is-link');
  });

  it('sets aria-current to last item', () => {
    createTestComponent(DynamicBreadcrumbComponent);
    expect(breadcrumbItemInstances[0].getAttribute('aria-current')).toBeFalsy();
    expect(breadcrumbItemInstances[1].getAttribute('aria-current')).toBeFalsy();
    expect(breadcrumbItemInstances[2].getAttribute('aria-current')).toBe('page');

    (testInstance as DynamicBreadcrumbComponent).items = ['test', 'test2'];
    fixture.detectChanges();
    breadcrumbItemInstances = fixture.nativeElement.querySelectorAll('.nx-breadcrumb-item');

    expect(breadcrumbItemInstances[0].getAttribute('aria-current')).toBeFalsy();
    expect(breadcrumbItemInstances[1].getAttribute('aria-current')).toBe('page');
  });
});

@Component({
  selector: 'test-breadcrumb-on-push-component',
  template: `
    <ol nxBreadcrumb [negative]="negative">
      <li>
        <a nxBreadcrumbItem> test </a>
        <a nxBreadcrumbItem> test 2 </a>
      </li>
    </ol>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NxBreadcrumbModule],
})
class BreadcrumbOnPushComponent extends BreadcrumbTest {
  negative = true;
}

@Component({
  selector: 'test-basic-breadcrumb-component',
  template: `
    <ol nxBreadcrumb [negative]="negative">
      <li>
        <a nxBreadcrumbItem> test </a>
      </li>
      <li>
        <a nxBreadcrumbItem> test 2 </a>
      </li>
    </ol>
  `,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NxBreadcrumbModule],
})
class BasicBreadcrumbComponent extends BreadcrumbTest {
  negative = false;
}

@Component({
  selector: 'test-dynamic-breadcrumb-component',
  template: `
    <ol nxBreadcrumb>
      @for (item of items; track item) {
        <li>
          <a nxBreadcrumbItem>
            {{ item }}
          </a>
        </li>
      }
    </ol>
  `,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NxBreadcrumbModule],
})
class DynamicBreadcrumbComponent extends BreadcrumbTest {
  items = ['Home', 'Test', 'Test2'];
}

@Component({
  selector: 'test-link-breadcrumb-component',
  template: `
    <ol nxBreadcrumb [appearance]="appearance">
      <li>
        <a nxBreadcrumbItem> test </a>
      </li>
      <li>
        <a nxBreadcrumbItem> test 2 </a>
      </li>
    </ol>
  `,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NxBreadcrumbModule],
})
class LinkBreadcrumbComponent extends BreadcrumbTest {
  appearance = 'link' as const;
}

@Component({
  selector: 'test-inverse-breadcrumb-component',
  template: `
    <ol nxBreadcrumb [inverse]="inverse" [type]="type">
      <li>
        <a nxBreadcrumbItem> test </a>
      </li>
      <li>
        <a nxBreadcrumbItem> test 2 </a>
      </li>
    </ol>
  `,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NxBreadcrumbModule],
})
class InverseBreadcrumbComponent extends BreadcrumbTest {
  inverse = false;
  type: NxBreadcrumbType = 'secondary';
}

@Component({
  selector: 'test-surface-breadcrumb-component',
  template: `
    <div [nxSurface]="surface()">
      <ol nxBreadcrumb [inverse]="inverse" [type]="type">
        <li>
          <a nxBreadcrumbItem> test </a>
        </li>
        <li>
          <a nxBreadcrumbItem> test 2 </a>
        </li>
      </ol>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NxBreadcrumbModule, NxSurface],
})
class SurfaceBreadcrumbComponent extends BreadcrumbTest {
  inverse?: boolean;
  type: NxBreadcrumbType = 'secondary';
  readonly surface = signal<NxSurfaceType>('attention');
}
