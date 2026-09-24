import { ChangeDetectionStrategy, Component, Directive, Type, ViewChild } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { NxListA1Size, NxListComponent, NxListType } from './list.component';
import { NxListModule } from './list.module';

@Directive({ standalone: true })
abstract class ListTest {
  @ViewChild(NxListComponent)
  listInstance!: NxListComponent;
}

describe('NxListComponent', () => {
  let fixture: ComponentFixture<ListTest>;
  let testInstance: ListTest;
  let listInstance: NxListComponent;
  let listNativeElement: HTMLUListElement;

  const createTestComponent = (component: Type<ListTest>) => {
    fixture = TestBed.createComponent(component);
    fixture.detectChanges();
    testInstance = fixture.componentInstance;
    listInstance = testInstance.listInstance;
    listNativeElement = fixture.nativeElement.querySelector('ul') as HTMLUListElement;
  };

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [NxListModule, BasicList, ListWithModifier, ListWithIcons, ConfigurableList],
    }).compileComponents();
  }));

  it('creates the List', waitForAsync(() => {
    createTestComponent(BasicList);
    expect(listInstance).toBeTruthy();
    expect(listNativeElement).toHaveClass('nx-list--normal');
  }));

  it('creates full modifier class from a correct keyword', waitForAsync(() => {
    createTestComponent(ListWithModifier);
    expect(listNativeElement).toHaveClass('nx-list--small');
    expect(listNativeElement).toHaveClass('nx-list--ordered-circle');
    expect(listNativeElement).toHaveClass('nx-list--negative');
  }));

  it('displays list icons', waitForAsync(() => {
    createTestComponent(ListWithIcons);
    const icons = fixture.debugElement.queryAll(By.css('nx-icon'));

    expect(icons[0].componentInstance.name).toBe('check');
    expect(icons[1].componentInstance.name).toBe('product-cross');
  }));

  it('should update class names after input changes', fakeAsync(() => {
    createTestComponent(ConfigurableList);
    (testInstance as ConfigurableList).property = 'small negative';
    fixture.detectChanges();
    expect(listNativeElement).toHaveClass('nx-list--small');
    expect(listNativeElement).toHaveClass('nx-list--negative');
  }));

  it('should change the icon', () => {
    createTestComponent(ConfigurableList);
    (testInstance as ConfigurableList).iconName = 'product-cross';
    fixture.detectChanges();
    const listItems: NodeListOf<HTMLLIElement> = listNativeElement.querySelectorAll('li');
    expect(listItems.item(0).querySelector('nx-icon')).toHaveClass('product-cross');
  });

  it('Should change size', waitForAsync(() => {
    createTestComponent(ConfigurableList);
    (testInstance as ConfigurableList).property = 'xsmall';
    fixture.detectChanges();
    expect(listNativeElement).toHaveClass('nx-list--xsmall');
  }));

  it('maps the A1 size s to the small styles', waitForAsync(() => {
    createTestComponent(ConfigurableList);
    (testInstance as ConfigurableList).property = 'normal';
    (testInstance as ConfigurableList).size = 's';
    fixture.detectChanges();
    expect(listNativeElement).toHaveClass('nx-list--small');
    expect(listNativeElement).not.toHaveClass('nx-list--normal');
  }));

  it('maps the A1 sizes to the condensed styles', waitForAsync(() => {
    createTestComponent(ConfigurableList);
    (testInstance as ConfigurableList).property = 'xsmall';
    (testInstance as ConfigurableList).condensed = true;
    (testInstance as ConfigurableList).size = 's';
    fixture.detectChanges();
    expect(listNativeElement).toHaveClass('nx-list--small-condensed');
    expect(listNativeElement).not.toHaveClass('nx-list--xsmall-condensed');

    (testInstance as ConfigurableList).size = 'm';
    fixture.detectChanges();
    expect(listNativeElement).toHaveClass('nx-list--normal-condensed');
    expect(listNativeElement).not.toHaveClass('nx-list--small-condensed');
  }));

  it('lets the size input win over the size in the nxList modifier', waitForAsync(() => {
    createTestComponent(ConfigurableList);
    (testInstance as ConfigurableList).property = 'xsmall negative';
    (testInstance as ConfigurableList).size = 'm';
    fixture.detectChanges();
    expect(listNativeElement).toHaveClass('nx-list--normal');
    expect(listNativeElement).not.toHaveClass('nx-list--xsmall');
    expect(listNativeElement).toHaveClass('nx-list--negative');
  }));

  it('falls back to the nxList modifier when the size input is cleared', waitForAsync(() => {
    createTestComponent(ConfigurableList);
    (testInstance as ConfigurableList).property = 'xsmall';
    (testInstance as ConfigurableList).size = 'm';
    fixture.detectChanges();
    (testInstance as ConfigurableList).size = undefined;
    fixture.detectChanges();
    expect(listNativeElement).toHaveClass('nx-list--xsmall');
  }));

  it('applies the negative styles via the inverse input', waitForAsync(() => {
    createTestComponent(ConfigurableList);
    (testInstance as ConfigurableList).inverse = true;
    fixture.detectChanges();
    expect(listNativeElement).toHaveClass('nx-list--negative');
  }));

  it('keeps supporting the legacy negative modifier', waitForAsync(() => {
    createTestComponent(ConfigurableList);
    (testInstance as ConfigurableList).property = 'small negative';
    fixture.detectChanges();
    expect(listNativeElement).toHaveClass('nx-list--negative');
  }));

  // `negative` and `inverse` sit at the same level, so neither overrules the other.
  it('keeps the legacy negative modifier even with an explicit inverse=false', waitForAsync(() => {
    createTestComponent(ConfigurableList);
    (testInstance as ConfigurableList).property = 'small negative';
    (testInstance as ConfigurableList).inverse = false;
    fixture.detectChanges();
    expect(listNativeElement).toHaveClass('nx-list--negative');
  }));

  it('reports the legacy negative modifier on the public inverse signal', waitForAsync(() => {
    createTestComponent(ConfigurableList);
    (testInstance as ConfigurableList).property = 'small negative';
    fixture.detectChanges();
    expect(listInstance.inverse()).toBe(true);
  }));

  it('Should have primary as default type', waitForAsync(() => {
    createTestComponent(ConfigurableList);
    fixture.detectChanges();
    expect(listNativeElement).toHaveClass('nx-list--primary');
  }));

  it('Should change type', waitForAsync(() => {
    createTestComponent(ConfigurableList);
    (testInstance as ConfigurableList).type = 'secondary';
    fixture.detectChanges();
    expect(listNativeElement).toHaveClass('nx-list--secondary');
  }));

  describe('a11y', () => {
    it('has no accessibility violations', async () => {
      createTestComponent(BasicList);
      await expect(fixture.nativeElement).toBeAccessible();
    });

    it('should set aria-hidden to the icon', () => {
      createTestComponent(ListWithIcons);
      fixture.detectChanges();
      const listItems: NodeListOf<HTMLLIElement> = listNativeElement.querySelectorAll('li');
      const nxIcon = listItems.item(0).querySelector('nx-icon');
      expect(nxIcon?.getAttribute('aria-hidden')).toBe('true');
    });
  });
});

@Component({
  selector: 'test-basic-list',
  template: `
    <ul nxList>
      <li>1</li>
      <li>2</li>
    </ul>
  `,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NxListModule],
})
class BasicList extends ListTest {}

@Component({
  selector: 'test-list-with-modifier',
  template: `
    <ul nxList="small negative ordered-circle">
      <li>1</li>
      <li>2</li>
    </ul>
  `,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NxListModule],
})
class ListWithModifier extends ListTest {}

@Component({
  selector: 'test-list-with-icons',
  template: `
    <ul>
      <li nxListIcon="check">1</li>
      <li nxListIcon="product-cross">2</li>
    </ul>
  `,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NxListModule],
})
class ListWithIcons extends ListTest {}

@Component({
  selector: 'test-configurable-list',
  template: `
    <ul [nxList]="property" [type]="type" [size]="size" [condensed]="condensed" [inverse]="inverse">
      <li [nxListIcon]="iconName">1</li>
      <li>2</li>
    </ul>
  `,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NxListModule],
})
class ConfigurableList extends ListTest {
  property = 'small';
  iconName = 'check';
  type: NxListType = 'primary';
  size?: NxListA1Size;
  condensed = false;
  inverse?: boolean;
}
