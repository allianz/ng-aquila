import { generateLazyLoadingService } from './lazy-loading-service/generate-service';

import { of } from 'rxjs';
import chalk = require('chalk');
import { highlightSourceFiles } from './highlight-files';
import { createManifestData } from './manifest';
import { collectMetadata } from './metadata';

function run(source, { outputExampleSources, serviceOutputPath, additionalSourcePath }) {
  console.log(chalk.green('Processing Examples'));

  const groupedExamples = collectMetadata(source, serviceOutputPath);
  groupedExamples.forEach(group => {
    highlightSourceFiles(group, outputExampleSources);
  });

  let additionalExamples;
  if (additionalSourcePath) {
    console.log(chalk.green('Processing Private Examples'))
    additionalExamples = collectMetadata(additionalSourcePath, serviceOutputPath);
    additionalExamples.forEach(group => {
      highlightSourceFiles(group, outputExampleSources);
    });
  }

  chalk.green("Generating lazy loading servce");
  let manifest;
  if (additionalSourcePath) {
    generateLazyLoadingService(groupedExamples.concat(additionalExamples), serviceOutputPath);
    manifest = createManifestData(groupedExamples, source)
        .concat(createManifestData(additionalExamples, additionalSourcePath));
  } else {
    generateLazyLoadingService(groupedExamples, serviceOutputPath);
    manifest = createManifestData(groupedExamples, source);
  }

  return of({ examples: manifest });
}

export default {
  run
};
