import chalk from 'chalk';
import * as path from 'path';
import { defer, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { warnUnknownTags } from './common/jsdoc-tags';
import { Categorizer } from './processors/categorizer';
import { ComponentGroup, ComponentGrouper } from './processors/component-grouper';
import { ContentSlotLinker } from './processors/content-slot-linker';
import { ContentSlotPager } from './processors/content-slot-page';
import { DocsPrivateFilter } from './processors/docs-private-filter';
import { FilterDuplicateExports } from './processors/filter-duplicate-exports';
import { MergeInheritedProperties } from './processors/merge-inherited-properties';
import { readApiDocs } from './read-api-docs';
import { renderApiDocs } from './render-api-docs';

/**
 * Maps every input that accepts a fixed set of string values to those values, so that the search can
 * find inputs by a value such as `primary`. Inputs without such a set are left out to keep the
 * search payload small.
 */
const getInputValueMap = (doc) =>
  doc.properties
    .filter((p) => p.isDirectiveInput && p.inputValues.length > 0)
    .map((p) => ({ name: bindingName(p), values: p.inputValues }));

/** The name an input or output is bound by in a template. */
const bindingName = (property) => property.nameAlias || property.name;

/** Search entry of a directive or component. */
const getDirectiveEntry = (doc) => ({
  name: doc.name,
  directiveExportAs: doc.directiveExportAs,
  directiveSelectors: doc.directiveSelectors,
  inputs: doc.properties.filter((p) => p.isDirectiveInput).map(bindingName),
  outputs: doc.properties.filter((p) => p.isDirectiveOutput).map(bindingName),
  inputValues: getInputValueMap(doc),
  title: doc.description,
});

/** A doc, its members and their overload signatures. */
const withMembers = (doc) => [
  doc,
  ...(doc.members ?? []).flatMap((member) => [member, ...(member.overloads ?? [])]),
];

/** Reads the API of the sources, writes its pages and returns the API manifest entries. */
async function generate(source: string, dest: string): Promise<ComponentGroup[]> {
  let docs = readApiDocs(source);
  docs = new FilterDuplicateExports().process(docs);
  // Warn unknow tags before inherited members are copied, so that each tag is reported once.
  docs.flatMap(withMembers).forEach(warnUnknownTags);
  new MergeInheritedProperties().process(docs);
  docs = new DocsPrivateFilter().process(docs);
  new Categorizer().process(docs);
  new ContentSlotLinker().process(docs);

  const groups = new ComponentGrouper().process(docs);
  await renderApiDocs(groups, new ContentSlotPager().process(groups), dest);

  return groups;
}

/** Entry of a component group in the manifest. */
const getGroupEntry = (group: ComponentGroup) => ({
  id: group.packageName,
  ngModule: group.ngModule?.name,
  // Lets the viewer hide the slots tab for entry points that have no slots at all.
  hasSlots: group.contentSlotClasses.length > 0,
  directive: group.directives.map(getDirectiveEntry),
  component: group.components.map(getDirectiveEntry),
  services: group.services.map(getTitleEntry),
  classes: group.additionalClasses.map(getTitleEntry),
  interface: group.additionalInterfaces.map(getTitleEntry),
  typeAlias: group.additionalTypeAliases.map(getTitleEntry),
});

const getTitleEntry = (doc: { name: string; description: string }) => ({
  name: doc.name,
  title: doc.description,
});

function run(source: string, dest: string) {
  // defer will not read the sources until subscribed, so that main.ts can queue the tasks.
  return defer(() => {
    console.log(chalk.green('Generating API docs'));
    return generate(path.resolve(source), path.resolve(dest));
  }).pipe(
    map((groups) => ({ api: groups.map(getGroupEntry) })),
    catchError((error) => {
      console.error(chalk.magentaBright('Error while processing API docs'));
      console.error(chalk.magentaBright(error));
      return of(null);
    }),
  );
}

export default {
  run,
};
