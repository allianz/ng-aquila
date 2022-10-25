import { Collection, SchematicTestSetup } from '../../utils/testing/test-setup';

describe('ng-aquila@11: ng update', () => {
    const testSetup = new SchematicTestSetup('migration-v11', Collection.MIGRATIONS);

    it('should replace label with labelCollapsed', async () => {
        testSetup.writeFile(
            './projects/aquila-testing/src/app/app.component.html',
            `
      <div nxComparisonTableRowGroup [label]="myLabel" >
    `,
        );
        await testSetup.runMigration();
        expect(testSetup.appTree.readContent('./projects/aquila-testing/src/app/app.component.html')).toContain('[labelCollapsed]="myLabel"');
    });

    it('should replace getPopupConnectionElementRef on NxDatefieldDirective', async () => {
        testSetup.writeFile(
            './projects/aquila-testing/src/app/app.component.ts',
            `
    import { Component } from '@angular/core';

    // fake class that the typechecker finds the type in the test
    class NxDatefieldDirective {
    }

    @Component({
      selector: 'doc-root',
      templateUrl: './app.component.html'
    })
    export class AppComponent {
      title = 'documentation';
      datepicker: NxDatefieldDirective;

      constructor() {
        this.datepicker = new NxDatefieldDirective();
        this.datepicker.getPopupConnectionElementRef();
      }
    }
    `,
        );
        await testSetup.runMigration();

        expect(testSetup.appTree.readContent('./projects/aquila-testing/src/app/app.component.ts')).toContain('getConnectedOverlayOrigin');
    });
});
