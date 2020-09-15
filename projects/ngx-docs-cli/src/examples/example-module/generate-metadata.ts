import { map } from 'rxjs/operators';
import { pipe } from 'rxjs';
import { ExampleMetadata, ParsedMetadata } from './types';
import { basename, join, dirname } from 'path';

/** Given a string that is a camel or pascal case convert to dash case. */
function convertToDashCase(name: string): string {
  name = name.replace(/[A-Z]/g, ' $&');
  name = name.toLowerCase().trim();
  return name.split(' ').join('-');
}

export const generateExampleMetadata = pipe(
  map((metadata: ParsedMetadata) => {
    // Generate a unique id for the component by converting the class name to dash-case.
    // const id = convertToDashCase(metadata.component.replace('Example', '').replace('Component', ''));
    const folderName = basename(dirname(metadata.sourcePath));
    const id = convertToDashCase(folderName);



    const example: ExampleMetadata = {
      sourcePath: metadata.sourcePath,
      id,
      component: metadata.component,
      title: metadata.title || metadata.component
    };
    return example;
  })
);
