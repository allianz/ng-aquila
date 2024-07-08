import { Component, Directive, Type, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NxToolbarComponent } from './toolbar.component';
import { NxToolbarModule } from './toolbar.module';

@Directive({ standalone: true })
abstract class ToolbarTest {
    @ViewChild(NxToolbarComponent) toolbarInstance!: NxToolbarComponent;
}

describe('NxToolbarComponent', () => {
    let fixture: ComponentFixture<NxToolbarComponent>;
    let testInstance: ToolbarTest;
    let toolbarInstance: NxToolbarComponent;

    const createTestComponent = (component: Type<ToolbarTest>) => {
        fixture = TestBed.createComponent(component);
        fixture.detectChanges();
        testInstance = fixture.debugElement.componentInstance;
        toolbarInstance = testInstance.toolbarInstance;
    };

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [NxToolbarModule, BasicToolbar],
        }).compileComponents();
    }));

    it('should create toolbar component', waitForAsync(() => {
        createTestComponent(BasicToolbar);
        expect(toolbarInstance).toBeTruthy();
    }));

    describe('a11y', () => {
        it('has no accessibility violations', async () => {
            createTestComponent(BasicToolbar);
            await expectAsync(fixture.nativeElement).toBeAccessible();
        });
    });
});

@Component({
    template: `<nx-toolbar></nx-toolbar>`,
    standalone: true,
    imports: [NxToolbarModule],
})
class BasicToolbar extends ToolbarTest {}
