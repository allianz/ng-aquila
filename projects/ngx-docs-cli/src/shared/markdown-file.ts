export interface MarkdownFile {
    filename: string;
    rawData: string;
    content?: string;
    // optionally placed in the header of a markdown file, extracted by front-matter
    yaml?: any;
    examples?: any;
}
