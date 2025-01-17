import { Component, Directive, Type, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NxTabComponent } from './tab';
import { NxTabsModule } from './tabs.module';

@Directive({ standalone: true })
abstract class TabTest {
    @ViewChild(NxTabComponent) tab!: NxTabComponent;
}

describe('NxTabComponent', () => {
    let fixture: ComponentFixture<TabTest>;
    let testInstance: TabTest;

    const createTestComponent = (component: Type<TabTest>) => {
        fixture = TestBed.createComponent(component);
        fixture.detectChanges();
        testInstance = fixture.componentInstance;
    };

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [NxTabsModule, NoGroupTest, WithGroup],
        }).compileComponents();
    }));

    it('should throw an error if tab is not wrapped in tab-group', () => {
        expect(() => createTestComponent(NoGroupTest)).toThrowError(/The nx-tab element has to be wrapped.*/);
    });

    it('should destroy the viewrefs when destroyed', () => {
        createTestComponent(WithGroup);
        const headerRef = testInstance.tab.headerViewRef;
        const contentRef = testInstance.tab.contentViewRef;
        testInstance.tab.ngOnDestroy();
        fixture.detectChanges();
        expect(headerRef.destroyed).toBeTrue();
        expect(contentRef.destroyed).toBeTrue();
    });
});

@Component({
    template: `<nx-tab>Some content</nx-tab>`,
    imports: [NxTabsModule],
})
class NoGroupTest extends TabTest {}

@Component({
    template: `
        <nx-tab-group>
            <nx-tab><ng-template nxTabLabel>Label</ng-template>Some content</nx-tab>
        </nx-tab-group>
    `,
    imports: [NxTabsModule],
})
class WithGroup extends TabTest {}
