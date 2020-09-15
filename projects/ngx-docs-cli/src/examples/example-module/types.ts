// Interfaces for the data to extract from the ts example files
export interface ExampleMetadata {
  component: string;
  sourcePath: string;
  id: string;
  title: string;
}

export interface ParsedMetadata {
  component: string;
  title: string;
  sourcePath: string;
}
