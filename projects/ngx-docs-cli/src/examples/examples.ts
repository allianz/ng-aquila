import { generateLazyLoadingService } from './lazy-loading-service/generate-service';

import { of } from 'rxjs';
import chalk = require('chalk');
import { highlightSourceFiles } from './highlight-files';
import { createManifestData } from './manifest';
import { collectMetadata } from './metadata';

function run(source, { outputExampleSources, serviceOutputPath }) {
  console.log(chalk.green('Processing Examples'));

  const groupedExamples = collectMetadata(source, serviceOutputPath);
  groupedExamples.forEach(group => {
    highlightSourceFiles(group, outputExampleSources);
  });

  chalk.green("Generating lazy loading servce");
  generateLazyLoadingService(groupedExamples, serviceOutputPath);

  const manifest = createManifestData(groupedExamples, source);

  return of({ examples: manifest });
}

export default {
  run
};
