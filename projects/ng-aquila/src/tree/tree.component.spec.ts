import { DOWN_ARROW, END, HOME, LEFT_ARROW, RIGHT_ARROW, UP_ARROW } from '@angular/cdk/keycodes';
import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { BehaviorSubject, Observable } from 'rxjs';

import { dispatchKeyboardEvent } from '../cdk-test-utils';
import { NxFlatTreeControl, NxTreeComponent, NxTreeFlatDataSource, NxTreeModule } from './public-api';

describe(NxTreeComponent.name, () => {
    /** Represents an indent for expectNestedTreeToNxch */
    const _ = {};

    let treeElement: HTMLElement;
    let underlyingDataSource: FakeDataSource;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [NxTreeModule],
            declarations: [SimpleNxTreeApp, NxTreeAppWithToggle, WhenNodeNxTreeApp, NxTreeAppWithButton],
        }).compileComponents();
    }));

    describe('flat tree', () => {
        describe('should initialize', () => {
            let fixture: ComponentFixture<SimpleNxTreeApp>;
            let component: SimpleNxTreeApp;

            beforeEach(() => {
                fixture = TestBed.createComponent(SimpleNxTreeApp);

                component = fixture.componentInstance;
                underlyingDataSource = component.underlyingDataSource;
                treeElement = fixture.nativeElement.querySelector('nx-tree');

                fixture.detectChanges();
            });

            it('with rendered dataNodes', () => {
                const nodes = getNodes(treeElement);

                expect(nodes).withContext('Expect nodes to be defined').toBeDefined();
                expect(nodes[0]).toHaveClass('customNodeClass');
            });

            it('with the right accessibility roles', () => {
                expect(treeElement.getAttribute('role')).toBe('tree');
                getNodes(treeElement).forEach(node => {
                    expect(node.getAttribute('role')).toBe('treeitem');
                });
            });

            it('with the right data', () => {
                expect(underlyingDataSource.data).toHaveSize(3);

                const data = underlyingDataSource.data;
                expectFlatTreeToNxch(
                    treeElement,
                    24,
                    32,
                    ['topping_1 - cheese_1 + base_1'],
                    ['topping_2 - cheese_2 + base_2'],
                    ['topping_3 - cheese_3 + base_3'],
                );

                underlyingDataSource.addChild(data[2]);
                fixture.detectChanges();

                expectFlatTreeToNxch(
                    treeElement,
                    24,
                    32,
                    ['topping_1 - cheese_1 + base_1'],
                    ['topping_2 - cheese_2 + base_2'],
                    ['topping_3 - cheese_3 + base_3'],
                    ['_, topping_4 - cheese_4 + base_4'],
                );
            });
        });

        describe('with button', () => {
            let fixture: ComponentFixture<NxTreeAppWithButton>;
            let component: NxTreeAppWithButton;

            it('with the right accessibility roles', () => {
                fixture = TestBed.createComponent(NxTreeAppWithButton);

                component = fixture.componentInstance;
                treeElement = fixture.nativeElement.querySelector('nx-tree');

                fixture.detectChanges();

                getNodes(treeElement).forEach(node => {
                    expect(node.getAttribute('role')).toBe('group');
                });
            });
        });

        describe('with toggle', () => {
            let fixture: ComponentFixture<NxTreeAppWithToggle>;
            let component: NxTreeAppWithToggle;

            beforeEach(() => {
                fixture = TestBed.createComponent(NxTreeAppWithToggle);

                component = fixture.componentInstance;
                underlyingDataSource = component.underlyingDataSource;
                treeElement = fixture.nativeElement.querySelector('nx-tree');

                fixture.detectChanges();
            });

            it('should expand/collapse the node', () => {
                expect(underlyingDataSource.data).toHaveSize(3);

                expect(component.treeControl.expansionModel.selected).withContext('Expect no expanded node').toHaveSize(0);

                component.toggleRecursively = false;
                const data = underlyingDataSource.data;
                const child = underlyingDataSource.addChild(data[2]);
                underlyingDataSource.addChild(child);
                fixture.detectChanges();

                expectFlatTreeToNxch(
                    treeElement,
                    24,
                    32,
                    ['topping_1 - cheese_1 + base_1'],
                    ['topping_2 - cheese_2 + base_2'],
                    ['topping_3 - cheese_3 + base_3'],
                );

                (getNodes(treeElement)[2] as HTMLElement).click();
                fixture.detectChanges();

                expect(component.treeControl.expansionModel.selected).withContext('Expect node expanded one level').toHaveSize(1);
                expectFlatTreeToNxch(
                    treeElement,
                    24,
                    32,
                    ['topping_1 - cheese_1 + base_1'],
                    ['topping_2 - cheese_2 + base_2'],
                    ['topping_3 - cheese_3 + base_3'],
                    [_, 'topping_4 - cheese_4 + base_4'],
                );

                (getNodes(treeElement)[3] as HTMLElement).click();
                fixture.detectChanges();

                expect(component.treeControl.expansionModel.selected).withContext('Expect node expanded').toHaveSize(2);
                expectFlatTreeToNxch(
                    treeElement,
                    24,
                    32,
                    ['topping_1 - cheese_1 + base_1'],
                    ['topping_2 - cheese_2 + base_2'],
                    ['topping_3 - cheese_3 + base_3'],
                    [_, 'topping_4 - cheese_4 + base_4'],
                    [_, _, 'topping_5 - cheese_5 + base_5'],
                );

                (getNodes(treeElement)[2] as HTMLElement).click();
                fixture.detectChanges();

                expectFlatTreeToNxch(
                    treeElement,
                    24,
                    32,
                    ['topping_1 - cheese_1 + base_1'],
                    ['topping_2 - cheese_2 + base_2'],
                    ['topping_3 - cheese_3 + base_3'],
                );
            });

            it('should expand/collapse the node recursively', () => {
                expect(underlyingDataSource.data).toHaveSize(3);

                expect(component.treeControl.expansionModel.selected).withContext('Expect no expanded node').toHaveSize(0);

                const data = underlyingDataSource.data;
                const child = underlyingDataSource.addChild(data[2]);
                underlyingDataSource.addChild(child);
                fixture.detectChanges();

                expectFlatTreeToNxch(
                    treeElement,
                    24,
                    32,
                    ['topping_1 - cheese_1 + base_1'],
                    ['topping_2 - cheese_2 + base_2'],
                    ['topping_3 - cheese_3 + base_3'],
                );

                (getNodes(treeElement)[2] as HTMLElement).click();
                fixture.detectChanges();

                expect(component.treeControl.expansionModel.selected).withContext('Expect nodes expanded').toHaveSize(3);
                expectFlatTreeToNxch(
                    treeElement,
                    24,
                    32,
                    ['topping_1 - cheese_1 + base_1'],
                    ['topping_2 - cheese_2 + base_2'],
                    ['topping_3 - cheese_3 + base_3'],
                    [_, 'topping_4 - cheese_4 + base_4'],
                    [_, _, 'topping_5 - cheese_5 + base_5'],
                );

                (getNodes(treeElement)[2] as HTMLElement).click();
                fixture.detectChanges();

                expect(component.treeControl.expansionModel.selected).withContext('Expect node collapsed').toHaveSize(0);

                expectFlatTreeToNxch(
                    treeElement,
                    24,
                    32,
                    ['topping_1 - cheese_1 + base_1'],
                    ['topping_2 - cheese_2 + base_2'],
                    ['topping_3 - cheese_3 + base_3'],
                );
            });
        });

        describe('with when node template', () => {
            let fixture: ComponentFixture<WhenNodeNxTreeApp>;
            let component: WhenNodeNxTreeApp;

            beforeEach(() => {
                fixture = TestBed.createComponent(WhenNodeNxTreeApp);

                component = fixture.componentInstance;
                underlyingDataSource = component.underlyingDataSource;
                treeElement = fixture.nativeElement.querySelector('nx-tree');

                fixture.detectChanges();
            });

            it('with the right data', () => {
                expectFlatTreeToNxch(
                    treeElement,
                    24,
                    32,
                    ['topping_1 - cheese_1 + base_1'],
                    ['topping_2 - cheese_2 + base_2'],
                    ['topping_3 - cheese_3 + base_3'],
                    ['>>> topping_4 - cheese_4 + base_4'],
                );
            });
        });

        describe('keyboard navigaton', () => {
            let fixture: ComponentFixture<NxTreeAppWithToggle>;
            let component: NxTreeAppWithToggle;

            beforeEach(() => {
                fixture = TestBed.createComponent(NxTreeAppWithToggle);

                component = fixture.componentInstance;
                underlyingDataSource = component.underlyingDataSource;
                treeElement = fixture.nativeElement.querySelector('nx-tree');

                fixture.detectChanges();
            });

            it('should focus on first data on HOME', () => {
                expect(component.tree.focusedData).toBeFalsy();

                dispatchKeyboardEvent(treeElement, 'keydown', HOME);
                expect(component.tree.focusedData.pizzaTopping).toBe('topping_1');
            });

            it('should focus on the last data on END', () => {
                expect(component.tree.focusedData).toBeFalsy();

                dispatchKeyboardEvent(treeElement, 'keydown', END);
                // The collapsed last node is topping_3
                expect(component.tree.focusedData.pizzaTopping).toBe('topping_3');
            });

            it('should focus on next data on DOWN_ARROW', () => {
                expect(component.tree.focusedData).toBeFalsy();

                for (let i = 1; i <= 3; i++) {
                    dispatchKeyboardEvent(treeElement, 'keydown', DOWN_ARROW);
                    expect(component.tree.focusedData.pizzaTopping).toBe(`topping_${i}`);
                }
            });

            it('should focus on previous data on UP_ARROW', () => {
                expect(component.tree.focusedData).toBeFalsy();

                for (let i = 3; i >= 1; i--) {
                    dispatchKeyboardEvent(treeElement, 'keydown', UP_ARROW);
                    expect(component.tree.focusedData.pizzaTopping).toBe(`topping_${i}`);
                }
            });

            it('should expand focused node on RIGHT_ARROW, and collapse on LEFT_ARROW', () => {
                expect(component.tree.focusedData).toBeFalsy();

                const data = underlyingDataSource.data;
                underlyingDataSource.addChild(data[0]);
                underlyingDataSource.addChild(data[0]);

                fixture.detectChanges();

                // Focus first item
                dispatchKeyboardEvent(treeElement, 'keydown', DOWN_ARROW);
                expect(component.tree.focusedData.pizzaTopping).toBe('topping_1');
                fixture.detectChanges();

                // Expand the node
                dispatchKeyboardEvent(treeElement, 'keydown', RIGHT_ARROW);
                fixture.detectChanges();

                // Focus first child
                dispatchKeyboardEvent(treeElement, 'keydown', DOWN_ARROW);
                expect(component.tree.focusedData.pizzaTopping).toBe('topping_4');

                // Focus second child
                dispatchKeyboardEvent(treeElement, 'keydown', DOWN_ARROW);
                expect(component.tree.focusedData.pizzaTopping).toBe('topping_5');

                // Focus parent
                dispatchKeyboardEvent(treeElement, 'keydown', LEFT_ARROW);
                expect(component.tree.focusedData.pizzaTopping).toBe('topping_1');
                expect(component.treeControl.expansionModel.selected).withContext('1 node expanded').toHaveSize(1);

                // Collapse parent
                dispatchKeyboardEvent(treeElement, 'keydown', LEFT_ARROW);
                fixture.detectChanges();
                expect(component.tree.focusedData.pizzaTopping).toBe('topping_1');

                expect(component.treeControl.expansionModel.selected).withContext('no node expanded').toHaveSize(0);

                // Focus next parent
                dispatchKeyboardEvent(treeElement, 'keydown', DOWN_ARROW);
                fixture.detectChanges();
                expect(component.tree.focusedData.pizzaTopping).toBe('topping_2');

                // Focus previous parent
                dispatchKeyboardEvent(treeElement, 'keydown', UP_ARROW);
                fixture.detectChanges();
                expect(component.tree.focusedData.pizzaTopping).toBe('topping_1');
            });

            it('should get nest level list', () => {
                const data = [
                    {
                        label: '1',
                        level: 0,
                    },
                    {
                        label: '2',
                        level: 0,
                    },
                    {
                        label: '2.1',
                        level: 1,
                    },
                    {
                        label: '2.2',
                        level: 1,
                    },
                    {
                        label: '3',
                        level: 0,
                    },
                    {
                        label: '3.1',
                        level: 1,
                    },
                    {
                        label: '3.2',
                        level: 2,
                    },
                    {
                        label: '4',
                        level: 0,
                    },
                ];
                expect(component.tree._getNestLevels(data, 0)).toEqual([]);
                expect(component.tree._getNestLevels(data, 1)).toEqual([
                    {
                        label: '2.1',
                        level: 1,
                    },
                    {
                        label: '2.2',
                        level: 1,
                    },
                ]);
                expect(component.tree._getNestLevels(data, 4)).toEqual([
                    {
                        label: '3.1',
                        level: 1,
                    },
                    {
                        label: '3.2',
                        level: 2,
                    },
                ]);
                expect(component.tree._getNestLevels(data, 5)).toEqual([
                    {
                        label: '3.2',
                        level: 2,
                    },
                ]);
            });
        });
    });
});

class TestData {
    level!: number;

    readonly observableChildren = new BehaviorSubject<TestData[]>(this.children);

    constructor(
        readonly pizzaTopping: string,
        readonly pizzaCheese: string,
        readonly pizzaBase: string,
        readonly children: TestData[] = [],
        readonly isSpecial = false,
    ) {}
}

class FakeDataSource {
    dataIndex = 0;
    _dataChange = new BehaviorSubject<TestData[]>([]);
    set data(data: TestData[]) {
        this._dataChange.next(data);
    }
    get data() {
        return this._dataChange.getValue();
    }

    connect(): Observable<TestData[]> {
        return this._dataChange;
    }

    disconnect() {}

    constructor() {
        for (let i = 0; i < 3; i++) {
            this.addData();
        }
    }

    addChild(parent: TestData, isSpecial = false) {
        const nextIndex = ++this.dataIndex;
        const child = new TestData(`topping_${nextIndex}`, `cheese_${nextIndex}`, `base_${nextIndex}`);

        const index = this.data.indexOf(parent);
        if (index > -1) {
            parent = new TestData(parent.pizzaTopping, parent.pizzaCheese, parent.pizzaBase, parent.children, isSpecial);
        }
        parent.children.push(child);
        parent.observableChildren.next(parent.children);

        const copiedData = this.data.slice();
        if (index > -1) {
            copiedData.splice(index, 1, parent);
        }
        this.data = copiedData;
        return child;
    }

    addData(isSpecial = false) {
        const nextIndex = ++this.dataIndex;
        const copiedData = this.data.slice();
        copiedData.push(new TestData(`topping_${nextIndex}`, `cheese_${nextIndex}`, `base_${nextIndex}`, [], isSpecial));

        this.data = copiedData;
    }
}

function getNodes(treeElement: Element): Element[] {
    return [].slice.call(treeElement.querySelectorAll('.nx-tree__node'))!;
}

function expectFlatTreeToNxch(treeElement: Element, expectedPaddingIndent = 24, expectedPaddingOffset = 32, ...expectedTree: any[]) {
    const missedExpectations: string[] = [];

    function checkNode(node: Element, expectedNode: any[]) {
        const actualTextContent = node.textContent!.trim();
        const expectedTextContent = expectedNode[expectedNode.length - 1];
        if (actualTextContent !== expectedTextContent) {
            missedExpectations.push(`Expected node contents to be ${expectedTextContent} but was ${actualTextContent}`);
        }
    }

    function checkLevel(node: Element, expectedNode: any[]) {
        const actualLevel = (node as HTMLElement).style.paddingLeft;
        if (expectedNode.length === 1) {
            if (actualLevel !== '') {
                missedExpectations.push(`Expected node level to be 0 but was ${actualLevel}`);
            }
        } else {
            const expectedLevel = `${(expectedNode.length - 1) * expectedPaddingIndent + expectedPaddingOffset}px`;
            if (actualLevel !== expectedLevel) {
                missedExpectations.push(`Expected node level to be ${expectedLevel} but was ${actualLevel}`);
            }
        }
    }

    getNodes(treeElement).forEach((node, index) => {
        const expected = expectedTree ? expectedTree[index] : null;

        checkLevel(node, expected);
        checkNode(node, expected);
    });

    if (missedExpectations.length) {
        fail(missedExpectations.join('\n'));
    }
}

function expectNestedTreeToNxch(treeElement: Element, ...expectedTree: any[]) {
    const missedExpectations: string[] = [];
    function checkNodeContent(node: Element, expectedNode: any[]) {
        const expectedTextContent = expectedNode[expectedNode.length - 1];
        const actualTextContent = node.childNodes.item(0).textContent!.trim();
        if (actualTextContent !== expectedTextContent) {
            missedExpectations.push(`Expected node contents to be ${expectedTextContent} but was ${actualTextContent}`);
        }
    }

    function checkNodeDescendants(node: Element, expectedNode: any[], currentIndex: number) {
        let expectedDescendant = 0;

        for (let i = currentIndex + 1; i < expectedTree.length; ++i) {
            if (expectedTree[i].length > expectedNode.length) {
                ++expectedDescendant;
            } else if (expectedTree[i].length === expectedNode.length) {
                break;
            }
        }

        const actualDescendant = getNodes(node).length;
        if (actualDescendant !== expectedDescendant) {
            missedExpectations.push(`Expected node descendant num to be ${expectedDescendant} but was ${actualDescendant}`);
        }
    }

    getNodes(treeElement).forEach((node, index) => {
        const expected = expectedTree ? expectedTree[index] : null;

        checkNodeDescendants(node, expected, index);
        checkNodeContent(node, expected);
    });

    if (missedExpectations.length) {
        fail(missedExpectations.join('\n'));
    }
}

@Component({
    template: `
        <nx-tree [dataSource]="dataSource" [treeControl]="treeControl">
            <nx-tree-node
                *nxTreeNodeDef="let node"
                class="customNodeClass"
                nxTreeNodePadding
                [nxTreeNodePaddingIndent]="24"
                [nxTreeNodePaddingOffset]="32"
                nxTreeNodeToggle
            >
                {{ node.pizzaTopping }} - {{ node.pizzaCheese }} + {{ node.pizzaBase }}
            </nx-tree-node>
        </nx-tree>
    `,
})
class SimpleNxTreeApp {
    treeControl = new NxFlatTreeControl();
    dataSource = new NxTreeFlatDataSource(this.treeControl);

    underlyingDataSource = new FakeDataSource();

    @ViewChild(NxTreeComponent) tree!: NxTreeComponent<TestData>;

    constructor() {
        this.underlyingDataSource.connect().subscribe(data => {
            this.dataSource.data = data;
        });
    }
}

@Component({
    template: `
        <nx-tree [dataSource]="dataSource" [treeControl]="treeControl">
            <nx-tree-node
                *nxTreeNodeDef="let node"
                class="customNodeClass"
                nxTreeNodePadding
                [nxTreeNodePaddingOffset]="32"
                nxTreeNodeToggle
                [nxTreeNodeToggleRecursive]="toggleRecursively"
            >
                {{ node.pizzaTopping }} - {{ node.pizzaCheese }} + {{ node.pizzaBase }}
            </nx-tree-node>
        </nx-tree>
    `,
})
class NxTreeAppWithToggle {
    toggleRecursively = true;

    treeControl = new NxFlatTreeControl();

    dataSource = new NxTreeFlatDataSource(this.treeControl);
    underlyingDataSource = new FakeDataSource();

    @ViewChild(NxTreeComponent) tree!: NxTreeComponent<TestData>;

    constructor() {
        this.underlyingDataSource.connect().subscribe(data => {
            this.dataSource.data = data;
        });
    }
}

@Component({
    template: `
        <nx-tree [dataSource]="dataSource" [treeControl]="treeControl">
            <nx-tree-node *nxTreeNodeDef="let node" class="customNodeClass" nxTreeNodePadding [nxTreeNodePaddingIndent]="24" nxTreeNodeToggle>
                {{ node.pizzaTopping }} - {{ node.pizzaCheese }} + {{ node.pizzaBase }}
            </nx-tree-node>
            <nx-tree-node *nxTreeNodeDef="let node; when: isSpecial" class="customNodeClass" nxTreeNodePadding [nxTreeNodePaddingIndent]="24" nxTreeNodeToggle>
                >>> {{ node.pizzaTopping }} - {{ node.pizzaCheese }} + {{ node.pizzaBase }}
            </nx-tree-node>
        </nx-tree>
    `,
})
class WhenNodeNxTreeApp {
    treeControl = new NxFlatTreeControl();
    dataSource = new NxTreeFlatDataSource(this.treeControl);
    underlyingDataSource = new FakeDataSource();

    @ViewChild(NxTreeComponent) tree!: NxTreeComponent<TestData>;

    isSpecial = (_: number, node: TestData) => node.isSpecial;

    constructor() {
        this.underlyingDataSource.connect().subscribe(data => {
            this.dataSource.data = data;
        });
    }
}

@Component({
    template: `
        <nx-tree [dataSource]="dataSource" [treeControl]="treeControl">
            <nx-tree-node
                *nxTreeNodeDef="let node"
                class="customNodeClass"
                nxTreeNodePadding
                [nxTreeNodePaddingOffset]="32"
                nxTreeNodeToggle
                [nxTreeNodeToggleRecursive]="toggleRecursively"
            >
                <button nxTreeNodeActionItem>
                    {{ node.label }}
                </button>
            </nx-tree-node>
        </nx-tree>
    `,
})
class NxTreeAppWithButton {
    toggleRecursively = true;

    treeControl = new NxFlatTreeControl();

    dataSource = new NxTreeFlatDataSource(this.treeControl);
    underlyingDataSource = new FakeDataSource();

    @ViewChild(NxTreeComponent) tree!: NxTreeComponent<TestData>;

    constructor() {
        this.underlyingDataSource.connect().subscribe(data => {
            this.dataSource.data = data;
        });
    }
}
