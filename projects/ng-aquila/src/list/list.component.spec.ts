import { Component, Directive, Type, ViewChild } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { NxListComponent, NxListType } from './list.component';
import { NxListModule } from './list.module';

@Directive({ standalone: true })
abstract class ListTest {
  @ViewChild(NxListComponent) listInstance!: NxListComponent;
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
    expect(listInstance.size).toBe('normal');
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
      await expectAsync(fixture.nativeElement).toBeAccessible();
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
  imports: [NxListModule],
})
class ListWithIcons extends ListTest {}

@Component({
  selector: 'test-configurable-list',
  template: `
    <ul [nxList]="property" [type]="type">
      <li [nxListIcon]="iconName">1</li>
      <li>2</li>
    </ul>
  `,
  imports: [NxListModule],
})
class ConfigurableList extends ListTest {
  property = 'small';
  iconName = 'check';
  type: NxListType = 'primary';
}
