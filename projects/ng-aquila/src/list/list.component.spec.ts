import { By } from '@angular/platform-browser';
import { Component, Type, ViewChild, Directive } from '@angular/core';
import { ComponentFixture, TestBed, fakeAsync, waitForAsync } from '@angular/core/testing';

import { NxListComponent } from './list.component';
import { NxListModule } from './list.module';

// For better readablity here, We can safely ignore some conventions in our specs
// tslint:disable:component-class-suffix

@Directive()
abstract class ListTest {
  @ViewChild(NxListComponent) listInstance: NxListComponent;
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
    listNativeElement = (fixture.nativeElement.querySelector('ul') as HTMLUListElement);
  };

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        BasicList,
        ListWithModifier,
        ListWithIcons,
        ConfigurableList
      ],
      imports: [
        NxListModule
      ]
    }).compileComponents();
  }));

  it('creates the List', waitForAsync(() => {
    createTestComponent(BasicList);
    expect(listInstance).toBeTruthy();
  }));

  it('creates full modifier class from a correct keyword', waitForAsync(() => {
    createTestComponent(ListWithModifier);
    expect(listNativeElement.classList.contains('nx-list--small')).toBe(true);
    expect(listNativeElement.classList.contains('nx-list--ordered-circle')).toBe(true);
    expect(listNativeElement.classList.contains('nx-list--negative')).toBe(true);
  }));

  it('displays list icons', waitForAsync(() => {
    createTestComponent(ListWithIcons);
    const icons = fixture.debugElement.queryAll(By.css('nx-icon'));

    expect(icons[0].componentInstance.name).toBe('check');
    expect(icons[1].componentInstance.name).toBe('product-cross');
  }));

  it('should update class names after input changes', fakeAsync(() => {
    createTestComponent(ConfigurableList);
    (testInstance as ConfigurableList).type = 'small negative';
    fixture.detectChanges();
    expect(listNativeElement.classList.contains('nx-list--small')).toBe(true);
    expect(listNativeElement.classList.contains('nx-list--negative')).toBe(true);
  }));

  it('should change the icon', () => {
    createTestComponent(ConfigurableList);
    (testInstance as ConfigurableList).iconName = 'product-cross';
    fixture.detectChanges();
    const listItems: NodeListOf<HTMLLIElement> = listNativeElement.querySelectorAll('li');
    expect(listItems.item(0).querySelector('nx-icon').classList).toContain('product-cross');
  });

  it('Should change size', waitForAsync(() => {
    createTestComponent(ConfigurableList);
    (testInstance as ConfigurableList).type = 'xsmall';
    fixture.detectChanges();
    expect(listNativeElement.classList.contains('nx-list--xsmall')).toBe(true);
  }));

  describe('a11y', () => {
    it('has no accessibility violations', async () => {
      createTestComponent(BasicList);
      await expectAsync(fixture.nativeElement).toBeAccessible();
    });
  });
});

@Component({
  template: `
    <ul nxList>
      <li>1</li>
      <li>2</li>
    </ul>
  `
})
class BasicList extends ListTest {
}

@Component({
  template: `
    <ul nxList="small negative ordered-circle">
      <li>1</li>
      <li>2</li>
    </ul>
  `
})
class ListWithModifier extends ListTest {
}

@Component({
  template: `
    <ul>
      <li nxListIcon="check">1</li>
      <li nxListIcon="product-cross">2</li>
    </ul>
  `
})
class ListWithIcons extends ListTest {
}

@Component({
  template: `
    <ul [nxList]="type">
      <li [nxListIcon]="iconName">1</li>
      <li>2</li>
    </ul>
  `
})
class ConfigurableList extends ListTest {
  type: string = 'small';
  iconName: string = 'check';
}
