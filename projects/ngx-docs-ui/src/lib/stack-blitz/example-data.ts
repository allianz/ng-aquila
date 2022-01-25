/**
 * Example data with information about component name, selector, files used in
 * example, and path to examples.
 */
export class ExampleData {
    /** Description of the example. */
    description!: string;

    /** List of files that are part of this example. */
    exampleFiles!: string[];

    /** Selector name of the example component. */
    selectorName!: string;

    /** Name of the file that contains the example component. */
    indexFilename!: string;

    /** Names of the components being used in this example. */
    componentNames!: string[];

    constructor(example: string, title: string) {
        if (!example) {
            return;
        }

        const exampleName = example.replace(/^\w|\b\w/g, letter => letter.toUpperCase());
        // Capitalize the first letter of each word in a string
        // For example, button-small will be replaced as
        // ButtonSmall
        const componentName = example
            .replace(/-/g, ' ')
            .replace(/\w\S*/g, w => w.replace(/^\w/, c => c.toUpperCase()))
            .replace(/ /g, '');

        this.exampleFiles = [`${example}-example.html`, `${example}-example.ts`, `${example}-example.css`];
        this.selectorName = `${example}-example`;
        this.indexFilename = `${example}-example.html`;
        this.description = title || exampleName.replace(/-+/g, ' ') + ' Example';
        this.componentNames = [`${componentName}ExampleComponent`];
    }
}
